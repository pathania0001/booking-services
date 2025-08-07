const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { AppError } = require("../utils");
const db = require("../models");
const {Base_Url_For_Flight_Services } = require("../config");
const { default: axios } = require("axios");

const bookingRepository = new BookingRepository();

const createBooking = async (data) => {
 console.log("inside-create-booking service")
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(`${Base_Url_For_Flight_Services}/api/v1/flight/${data.flightId}`)
    // not this http req. not respecting the locks if there any in flight service size 
    //so it can be solvewith the help of streaming services like kafka or background event driven services like inngest it is  for future;
    const flightData = flight.data.data;
    // console.log(flightData)

    //same for user_

    if(data.numberOfSeats > flightData.totalSeats)
    {
       throw new AppError(["Not enough seats Available"],StatusCodes.BAD_REQUEST)
    }
    const totalBillingAmount = data?.numberOfSeats ?data.numberOfSeats*flightData.price : flightData.price;

    const bookingPayload = {...data,totalCost:totalBillingAmount};
    const booking = await bookingRepository.create(bookingPayload,transaction);

    await axios.patch(`${Base_Url_For_Flight_Services}/api/v1/flight/${data.flightId}/seats`,{seats:data?.numberOfSeats});

    await transaction.commit();
    console.log(JSON.stringify(booking,null,2))
    return booking;
  } catch(error) {
     await transaction.rollback();
                //throw error
                 console.log("error :check",JSON.stringify(error,null,2))
                 
                if(error.status === 404){
                  throw new AppError(["Flight not found"],StatusCodes.BAD_REQUEST);
                }
              else 
                throw new AppError(["Something went wrong Creating Booking"],StatusCodes.INTERNAL_SERVER_ERROR);
  }

};

module.exports = {
    createBooking,
}