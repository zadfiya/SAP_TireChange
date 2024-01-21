const express = require("express");
const app = express();
const VehicleRouter = require("./vehicle");
const BookingRouter = require("./Booking");
const MasterRouter = require("./Master")

app.use("/vehicle",VehicleRouter);
app.use("/booking",BookingRouter);
app.use("/statistics",MasterRouter)

module.exports = app;