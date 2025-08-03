const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");
const { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
  console.log("inside-airplane-services");
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    console.log(error)
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      let explanation = [];
      error.errors.forEach((errorField) => {
        explanation.push(errorField.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    
    throw new AppError(
      "Cannot Create new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllAirplanes = async () => {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    console.log(error)
    throw new AppError(
      "Cannot fetch data of all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplaneById = async (id) => {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch data from airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyAirplane = async (id) => {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", error.statusCode);
    }
    throw new AppError(
      "Cannot delete airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirplane = async (id, data) => {
  try {
    const response = await airplaneRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", error.statusCode);
    }
    throw new AppError(
      "Cannot update airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplaneById,
  destroyAirplane,
  updateAirplane,
};
