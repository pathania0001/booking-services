const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { AppError } = require("../utils");
const db = require("../models");
const { Base_Url_For_Flight_Services, THIS_SERVICE, Queue } = require("../config");
const { default: axios } = require("axios");
const { ENUM } = require("../utils/common");
const { Op } = require("sequelize");

const { CANCELLED ,BOOKED} = ENUM.BOOKING_STATUS;
const bookingRepository = new BookingRepository();

const createBooking = async (data) => {
  console.log("inside-create-booking service");
  const transaction = await db.sequelize.transaction();
  try {

    const alreadyInProgress = await bookingRepository.getAll({
      where:{
        flightId:data.flightId,
        userId:data.userId,
        status:{
          [Op.ne]:[CANCELLED]
        }
      }
    }) 
    
    if(alreadyInProgress?.length>0){
      throw new AppError(["Your already have Booking in progress.Please cancel is before making a new booking."])
    }
      
    const flight = await axios.get(
      `${Base_Url_For_Flight_Services}/api/v1/flight/${data.flightId}`,
    );
    // not this http req. not respecting the locks if there any in flight service size
    //so it can be solvewith the help of streaming services like kafka or background event driven services like inngest it is  for future;
    const flightData = flight.data.data;
     //console.log(flightData)

    //same for user_

    if (data.numberOfSeats > flightData.totalSeats) {
      throw new AppError(
        ["Not enough seats Available"],
        StatusCodes.BAD_REQUEST
      );
    }
    const totalBillingAmount = data?.numberOfSeats
      ? data.numberOfSeats * flightData.price
      : flightData.price;

    const bookingPayload = { ...data, totalCost: totalBillingAmount };
    const booking = await bookingRepository.create(bookingPayload, transaction);
    await axios.patch(
      `${Base_Url_For_Flight_Services}/api/v1/flight/${data.flightId}/seats`,
        { seats: data?.numberOfSeats,dec: 1},
        {
        headers:{
          'x-internal-service':THIS_SERVICE
        }}
    );

    await transaction.commit();
    //console.log(JSON.stringify(booking, null, 2));
    return booking;
  } catch (error) {
   // console.log("errror: ",error)
    await transaction.rollback();
    //throw error
    console.log("error :check", JSON.stringify(error, null, 2));
   if(error instanceof AppError)
      throw error;
    if(error.status === 400){
      throw new AppError(["SomeThing went wrong in Creating Booking due to BAD_REQUEST"])
    }
     else
      throw new AppError(
        ["Something went wrong Creating Booking"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
  }
};

const makePayment = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingData = await bookingRepository.get(
      data?.bookingId,
      transaction
    );
    //  console.log(bookingData)
    if (bookingData.status === CANCELLED) {
      throw new AppError(["The time span corresponding to payment is Expired (Allready Cancelled)"],StatusCodes.BAD_REQUEST);
    }

    if (data.totalCost !== bookingData.totalCost) {
      throw new AppError(
        ["Amount of payment does not match"],
        StatusCodes.BAD_REQUEST
      );
    }

    if (data.userId !== bookingData.userId) {
      throw new AppError(
        ["The user corresponding to booking does not match"],
        StatusCodes.BAD_REQUEST
      );
    }

    //--Time window is of 10 min--//

    const bookingTime = new Date(`${bookingData.createdAt}`).getTime();
    const currTime = Date.now();

    if (currTime - bookingTime > 10 * 60 * 1000) {
         await cancelBooking({
          bookingId:bookingData.id,
          role:data.role||ENUM.USER_ROLE.USER,
          userId:data.userId});
         throw new AppError(["The time span corresponding to payment is Expired"],StatusCodes.BAD_REQUEST);
    }
    
    await bookingRepository.update(bookingData.id,{status:BOOKED})
      Queue.sendData({
            recepientEmail: 'mydummy867@gmail.com',
            subject: 'Flight booked',
            text: `Booking successfully done for the booking ${data.bookingId}`
        });
    await transaction.commit();
    return bookingData;
  } catch (error) {
    await transaction.rollback();
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }
};

const cancelBooking = async ({bookingId,role,userId}) => {
  const transaction = await db.sequelize.transaction();
  try {
    // console.log("inside cancelling",bookingId)
    const bookingData = await bookingRepository.get(bookingId, transaction);
    // console.log("bookingData :",bookingData)
    if (bookingData.status === CANCELLED) {
      transaction.commit();
      return true;
    }
    
    if(bookingData.userId !== userId)
      throw new AppError(["Access Denied : Not Allowed"]);

    await axios.patch(
      `${Base_Url_For_Flight_Services}/api/v1/flight/${bookingData.flightId}/seats`,
      { seats: bookingData.numberOfSeats , dec: 0},
     { headers:{
          'x-internal-service':THIS_SERVICE,
          'x-user-role':role
        }}
      );
   await bookingRepository.update(bookingData.id,{ status: CANCELLED },transaction);
   await transaction.commit();
    return true;
  } catch (error) {
    console.log(error)
    console.log(JSON.stringify(error, null, 2));
    await transaction.rollback();
    throw error;
  }
};


const findingExpiredBookings = async()=>{
     const tenMinutesAgo = new Date(Date.now() - 10*60*1000);
    return await bookingRepository.getAll({
      where:{
       createdAt:{
        [Op.lt]:tenMinutesAgo
      },
      status : { [Op.notIn] : [BOOKED,CANCELLED] }}})

}

const updateCorrespondingSeats = async ({flightId,numberOfSeats,role}) =>{
  // console.log(flightId,numberOfSeats)
    await axios.patch(`${Base_Url_For_Flight_Services}/api/v1/flight/${flightId}/seats`,
      {seats:numberOfSeats,dec:0},
      { headers:{
          'x-internal-service':THIS_SERVICE,
          'x-role':role
        }}
    )
}
const updateCorrespondingBookingStatus = async (bookingId)=>{
  // console.log(bookingId)
  await bookingRepository.update(bookingId,{status:CANCELLED});
}


module.exports = {
  createBooking,
  makePayment,
  cancelBooking,
  findingExpiredBookings,
  updateCorrespondingSeats,
  updateCorrespondingBookingStatus,
};
