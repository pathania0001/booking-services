

module.exports = {
  PORT: process.env.PORT || 8000,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  Base_Url_For_Flight_Services:process.env.FLIGHT_BASE_URL,
  // NODE_ENV: process.env.NODE_ENV, // Uncomment if needed
};
