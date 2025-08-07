const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { AppError } = require("../utils");
const db = require("../models");
const { Base_Url_For_Flight_Services } = require("../config");
const { default: axios } = require("axios");
const { ENUM } = require("../utils/common");

const { CANCELLED } = ENUM.BOOKING_STATUS;
const bookingRepository = new BookingRepository();

const createBooking = async (data) => {
  console.log("inside-create-booking service");
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${Base_Url_For_Flight_Services}/api/v1/flight/${data.flightId}`
    );
    // not this http req. not respecting the locks if there any in flight service size
    //so it can be solvewith the help of streaming services like kafka or background event driven services like inngest it is  for future;
    const flightData = flight.data.data;
    // console.log(flightData)

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
      { seats: data?.numberOfSeats }
    );

    await transaction.commit();
    console.log(JSON.stringify(booking, null, 2));
    return booking;
  } catch (error) {
    await transaction.rollback();
    //throw error
    console.log("error :check", JSON.stringify(error, null, 2));

    if (error.status === 404) {
      throw new AppError(["Flight not found"], StatusCodes.BAD_REQUEST);
    } else
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
         cancelBooking(bookingData.id);
         throw new AppError(["The time span corresponding to payment is Expired"],StatusCodes.BAD_REQUEST);
    }

    await transaction.commit();
    return bookingData;
  } catch (error) {
    transaction.rollback();
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }
};

const cancelBooking = async (bookingId) => {
  const transaction = await db.sequelize.transaction();
  try {
    // console.log("inside cancelling",bookingId)
    const bookingData = await bookingRepository.get(bookingId, transaction);
    // console.log("bookingData :",bookingData)
    if (bookingData.status === CANCELLED) {
      transaction.commit();
      return true;
    }
    await axios.patch(
      `${Base_Url_For_Flight_Services}/api/v1/flight/${bookingData.flightId}/seats`, { seats: bookingData.numberOfSeats , dec: 0});
    await bookingRepository.update(bookingData.id,{ status: CANCELLED },transaction);
    transaction.commit();
    return true;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    transaction.rollback();
    throw error;
  }
};

module.exports = {
  createBooking,
  makePayment,
};
