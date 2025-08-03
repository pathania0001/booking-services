const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CORS_ORIGIN } = require("./config");
const routes = require("./routes");

const app = express();


app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use(express.static("public"));


app.use(cookieParser());

// Health check route (optional)
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is up!" });
});


app.use("/api", routes);


module.exports = app ;
