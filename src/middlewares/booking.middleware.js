const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");
const { ErrorResponse } = require("../utils/common");

 const validateBookingRequest = (req,res,next)=>{
        const {flightId} = req.body;

        if(!flightId){
          ErrorResponse.message = "Something went wrong while creating new booking";
         ErrorResponse.error =  new AppError(["Flight is not found in the onncoming request"],StatusCodes.BAD_REQUEST)
           return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
   
    next();
}  

const validatePaymentBookingRequest = (req,res,next)=>{
   
   ErrorResponse.message = "Something went wrong while making payment";

   if(!req.body.bookingId){
     ErrorResponse.error =  new AppError(["Booking id not there in oncoming Request"],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
   }
   if(!req.body.totalCost){
     ErrorResponse.error =  new AppError(["Total Cost of Booking is not there in oncoming Request"],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
   }

   next();
}

const validateDeleteBookingRequest = (req,res,next) =>{
   const bookingId = req.body.bookingId;

   if(!bookingId){
    console.log("validate booking error")
    ErrorResponse.message = "Something went wrong while deleting booking";
    ErrorResponse.error = new AppError(["bookingId is not there in the oncoming deleting request"].StatusCodes.BAD_REQUEST);

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
   }

   next();
}

module.exports = {
  validateBookingRequest,
  validatePaymentBookingRequest,
  validateDeleteBookingRequest,
}
