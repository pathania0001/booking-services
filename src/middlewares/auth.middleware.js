

const { ENUM, ErrorResponse } = require("../utils/common");
const {AppError,} = require('../utils')
const { StatusCodes } = require('http-status-codes');

function isAuthenticated(req, res, next) {
  if (!req.headers["x-user-id"]) {
    const error = new AppError(["Not Authenticated"],StatusCodes.UNAUTHORIZED)
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.headers["x-user-role"] !== ENUM.USER_ROLE.ADMIN) {
   const error = new AppError(["Not Authenticated"],StatusCodes.UNAUTHORIZED)
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
  next();
}
module.exports = {
    isAuthenticated,
    isAdmin,
}