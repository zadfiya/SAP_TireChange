const express = require("express");
// const ETLCSV = require("./src/crons/ETLCSV.js")
const ExtractCSV = require("./src/crons/ExtractCSV");
require("dotenv").config();
const connectDB  = require("./Src/Config/DB");
const indexRouter = require("./Src/Routes/index");
const app = express();

// ETLCSV()
ExtractCSV()
connectDB();
app.use(express.json());

app.use("/api/v1",indexRouter)
app.use("/",(req,res)=>{res.json({success:true,message:"You are at Tire Change Site's Backend"})})

app.listen(process.env.PORT,()=>console.log("Server Running on port: "+process.env.PORT));
