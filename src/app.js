const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CORS_ORIGIN, COOKIE_SIGN } = require("./config");
const routes = require("./routes");
const {client,functions} = require("./inngest");
const { serve } = require("inngest/express");

const app = express();


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use(express.static("public"));


app.use(cookieParser(COOKIE_SIGN));

// Health check route (optional)
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is up!" });
});


app.use("/api", routes);

app.use("/api/inngest", serve({ client, functions }));


module.exports = app ;
