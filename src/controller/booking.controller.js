const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const Services = require("../services");
const { BookingRepository } = require("../repositories");



 const registerNewBooking = async (req , res) =>{

    console.log("inside-booking-controller")
    try {
        const booking = await Services.Booking.createBooking({
          flightId : req.body.flightId,
          userId : req.body.userId,
          totalCost : req.body.totalCost, 
          numberOfSeats:req.body?.numberOfSeats || 1,
          status:req.body.status,
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

module.exports = {
    registerNewBooking,
}