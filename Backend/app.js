const express = require("express");
require("dotenv").config();
const connectDB  = require("./Src/Config/DB");
const indexRouter = require("./Src/Routes/index");
const app = express();

connectDB();
app.use(express.json());
app.use("/api/v1",indexRouter)
app.listen(process.env.PORT,()=>console.log("Server Running on port: "+process.env.PORT));
