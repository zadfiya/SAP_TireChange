const express = require("express");
const app = express();
const VehicleRouter = require("./vehicle");

app.use("/vehicle",VehicleRouter);

module.exports = app;