
const express = require('express');
const airplaneRoutes = express.Router();
const Middleware = require('../../middlewares');
const Controller = require('../../controller');

airplaneRoutes.route("/register").post( Middleware.Airplane.validateAirplaneRequest,Controller.Airplane.registerAirplane);

airplaneRoutes.route("/").get(Controller.Airplane.getAllAirplanes);

airplaneRoutes.route("/:id").get(Controller.Airplane.getAirplaneById);

airplaneRoutes.route("/:id").delete(Controller.Airplane.destroyAirplane);

airplaneRoutes.route("/:id").patch( Middleware.Airplane.validateAirplaneRequest,Controller.Airplane.updateAirplane);
module.exports = airplaneRoutes