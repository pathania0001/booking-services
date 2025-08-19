const express = require('express');
const Controller = require('../../controller')
const Middleware = require('../../middlewares');
const bookingRouter = express.Router();

bookingRouter.route("/register").post(
    Middleware.Auth.isAuthenticated,
    Middleware.Booking.validateBookingRequest,
    Controller.Booking.registerNewBooking)

bookingRouter.route("/payment").patch(
    Middleware.Auth.isAuthenticated,
    Middleware.Booking.validatePaymentBookingRequest,
    Controller.Booking.makePayment);
bookingRouter.route("/cancel-booking").patch(
    Middleware.Auth.isAuthenticated,
    Middleware.Booking.validateDeleteBookingRequest,
    Controller.Booking.cancelBooking);

module.exports = bookingRouter;