const express = require("express");
const app = express();
const VehicleRouter = require("./vehicleRoute");
const BookingRouter = require("./bookingRoute");
const MasterRouter = require("./masterRoute")

app.use("/vehicle",VehicleRouter);
app.use("/booking",BookingRouter);
app.use("/statistics",MasterRouter)

module.exports = app;