const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { AppError } = require("../utils");

const bookingRepository = new BookingRepository();

const createBooking = async (data) => {
  console.log("inside-booking-services");
  try {
    const booking = await bookingRepository.create(data);
    return booking;
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
      "Cannot Create new Booking object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
    createBooking,
}