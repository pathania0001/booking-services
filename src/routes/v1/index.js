
const express  = require('express');

const airplaneRoutes = require('./airplane.routes');
const v1Routes = express.Router();

v1Routes.use('/airplane',airplaneRoutes);


module.exports = v1Routes;
