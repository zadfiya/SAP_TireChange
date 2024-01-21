const express = require("express");
const app = express();
const VehicleRouter = require("./vehicle");
const BookingRouter = require("./Booking");

app.use("/vehicle",VehicleRouter);
app.use("/schedule",BookingRouter);

module.exports = app;