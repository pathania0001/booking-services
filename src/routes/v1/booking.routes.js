const express = require('express');
const Controller = require('../../controller')
const Middleware = require('../../middlewares');
const bookingRouter = express.Router();
bookingRouter.route("/register").post(Middleware.Booking.validateBookingRequest,Controller.Booking.registerNewBooking)

module.exports = bookingRouter;