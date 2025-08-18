const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse, ENUM } = require("../utils/common");
const Service = require("../services");
const { response } = require("express");



 const registerNewBooking = async (req , res) =>{

    console.log("inside-booking-controller")
     console.log(req.headers['x-user-id'])
    try {
        const booking = await Service.Booking.createBooking({
          flightId : req.body.flightId,
          userId:req.headers['x-user-id'],
          numberOfSeats:req.body?.numberOfSeats || 1,
          userRole:req.headers['x-user-role']
         })
       
         SuccessResponse.data = booking;
      
         return res
                   .status(StatusCodes.ACCEPTED)
                   .json(SuccessResponse)
         
    } catch (error) {
      ErrorResponse.error = error;
         return res
                   .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                   .json(ErrorResponse)
         
    }
}

const makePayment  = async(req,res)=>{
  try {
     const response = await Service.Booking.makePayment(
    {
      bookingId:req.body.bookingId,
      userId:req.headers["x-user-id"],
      userRole:req.headers["x-user-role"] || ENUM.USER_ROLE.USER,
      totalCost:req.body.totalCost
    });
    SuccessResponse.data = response;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
   
}
const cancelBooking = async(req,res) =>{

  try {
    
    const response = await Service.Booking.cancelBooking({
      bookingId:req.body.bookingId,
      userId:req.headers['x-user-id'],
      role:req.headers['x-user-role'] || ENUM.USER_ROLE.USER
    })
    console.log(response)
    SuccessResponse.data = response;

    return res
             .status(StatusCodes.OK)
             .json(SuccessResponse)

  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }

}
module.exports = {
    registerNewBooking,
    makePayment,
    cancelBooking
}