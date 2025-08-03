
const Service = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse,SuccessResponse} = require('../utils/common');
    /* 
       POST /api/v1/airplane/register
       Register a new airplane
    */
   const registerAirplane = async (req , res) =>{
    console.log("inside-airplane-controller")
    try {
        const airplane = await Service.Airplane.createAirplane({
            modelNumber : req.body.modelNumber,
            capacity : req.body.capacity
         })
       
         SuccessResponse.data = airplane;
      
         return res
                   .status(StatusCodes.ACCEPTED)
                   .json(SuccessResponse)
         
    } catch (error) {
      ErrorResponse.error = error;
         return res
                   .status(error.statusCode)
                   .json(ErrorResponse)
         
    }
}

    /*
       GET /api/v1/airplane
       Get all airplanes
    */

const getAllAirplanes = async (req,res) =>{
     try {
       console.log("inside-airplane-controller")
      const airplanes = await Service.Airplane.getAllAirplanes();
      SuccessResponse.data = airplanes;
      return res 
                .status(StatusCodes.OK)
                .json(SuccessResponse)
     } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
     }
}
    /*
       GET /api/v1/airplane/:id
       Get Airplane by id
    */

const getAirplaneById = async (req , res) =>{
     try {
       
      const airplane = await Service.Airplane.getAirplaneById(req.params.id);
      SuccessResponse.data = airplane;
      console.log(SuccessResponse.data)
      return res 
                .status(StatusCodes.OK)
                .json(SuccessResponse)
     } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
     }
}

const destroyAirplane = async (req,res) =>{
  try {
      const response = await Service.Airplane.destroyAirplane(req.params.id);
      SuccessResponse.data = response;
      return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res
              .status(error.statusCode)
              .json(ErrorResponse);
  }
}

const updateAirplane = async (req,res) =>{
    console.log("inside-airplane-controller")
       try {
          const airplane = await Service.Airplane.updateAirplane(req.params.id,req.body);
          SuccessResponse.data = airplane;
          return res 
                      .status(StatusCodes.OK)
                      .json(SuccessResponse);
       } catch (error) {
          ErrorResponse.error = error;
          return res 
                    .status(error.statusCode)
                    .json(ErrorResponse);

       }

}
module.exports = {
    registerAirplane,
    getAllAirplanes,
    getAirplaneById,
    destroyAirplane,
    updateAirplane
}

