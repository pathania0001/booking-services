const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");
const { ErrorResponse } = require("../utils/common");
const { Error } = require("sequelize");

 const validateBookingRequest = (req,res,next)=>{
        const {flightId , userId , totalCost} = req.body;

        ErrorResponse.message = "Something went wrong while creating new booking";

        if(!flightId){
         ErrorResponse.error =  new AppError(["Flight is not found in the onncoming request form"],StatusCodes.BAD_REQUEST)
           return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }

        if(!userId){
         ErrorResponse.error =  new AppError(["User is not found in the onncoming request form"],StatusCodes.BAD_REQUEST)
           return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }

        if(!totalCost){
         ErrorResponse.error =  new AppError(["Total cost is not found in the onncoming request form"],StatusCodes.BAD_REQUEST)
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
   if(!req.body.userId){
     ErrorResponse.error =  new AppError(["Booking Owner is not there in oncoming Request"],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
   }
   if(!req.body.totalCost){
     ErrorResponse.error =  new AppError(["Total Cost of Booking is not there in oncoming Request"],StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
   }

   next();
}

module.exports = {
  validateBookingRequest,
  validatePaymentBookingRequest
}
