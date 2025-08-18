

const { ENUM, ErrorResponse } = require("../utils/common");
const {AppError,} = require('../utils')
const { StatusCodes } = require('http-status-codes');
const { ALLOWED_SERVICES } = require("../config");

function isAuthenticated(req, res, next) {
 console.log("entering in isAuthenticated middleware")
//console.log("headers :",req.headers)
  let isInternalServiceCall = false;
  const allowedServices = ALLOWED_SERVICES.split(" ");
  const callingService = req.headers['x-internal-service'];
  if(callingService && allowedServices.includes(callingService))
    isInternalServiceCall = true;
  if ( !req.headers["x-user-id"] && !isInternalServiceCall ) {
    console.log("here in auth error")
    const error = new AppError(["Not Authenticated"],StatusCodes.UNAUTHORIZED)
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
   console.log("leaving from isAuthenticated middleware")
  next();
}

function isAdmin(req, res, next) {
  console.log("entering in isAuthenticated middleware")
//console.log("headers :",req.headers)
  if (req.headers["x-user-role"] !== ENUM.USER_ROLE.ADMIN && req.headers['x-user-role'] !== ENUM.USER_ROLE.SYSTEM) {
    console.log("here in admin error")
   const error = new AppError(["Not Authenticated"],StatusCodes.UNAUTHORIZED)
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
   console.log("leaving from isAuthenticated middleware")
  next();
}
module.exports = {
    isAuthenticated,
    isAdmin,
}