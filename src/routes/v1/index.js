
const express  = require('express');
const bookingRouter = require('./booking.routes');
const v1Routes = express.Router();

v1Routes.use('/booking',bookingRouter);
module.exports = v1Routes;
