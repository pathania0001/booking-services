const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");
const { ErrorResponse } = require("../utils/common");

 const validateBookingRequest = (req,res,next)=>{
    try {
        const {flightId , userId , totalCost} = req.body;
        if(!flightId)
        {
         ErrorResponse.message = "Something went wrong while creating new booking";
         ErrorResponse.error =  new AppError(["Flight is not found in the onncoming request form"],StatusCodes.BAD_REQUEST)
            return res 
                     .status(StatusCodes.BAD_REQUEST)
                     .json(ErrorResponse)
        }
        if(!userId)
        {
         ErrorResponse.message = "Something went wrong while creating new booking";
         ErrorResponse.error =  new AppError(["User is not found in the onncoming request form"],StatusCodes.BAD_REQUEST)
            return res 
                     .status(StatusCodes.BAD_REQUEST)
                     .json(ErrorResponse)
        }
        if(!totalCost)
        {
         ErrorResponse.message = "Something went wrong while creating new booking";
         ErrorResponse.error =  new AppError(["Total cost is not found in the onncoming request form"],StatusCodes.BAD_REQUEST)
            return res 
                     .status(StatusCodes.BAD_REQUEST)
                     .json(ErrorResponse)
        }

    } catch (error) {
        
    }
    next();
}  

module.exports = {
  validateBookingRequest
}
