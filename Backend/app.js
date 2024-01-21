const express = require("express");
// const ETLCSV = require("./src/crons/ETLCSV.js")
const ExtractCSV = require("./src/crons/ExtractCSV");
require("dotenv").config();
const app = express();

// ETLCSV()
ExtractCSV()
app.listen(process.env.PORT,()=>console.log("Server Running on port: "+process.env.PORT));
