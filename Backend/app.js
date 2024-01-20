const express = require("express");
require("dotenv").config();
const connectdb = require("./db/db");
const app = express();
var cron = require("./src/Routes/cron");
var morgan = require("morgan");
const indexRouter = require('./src/Routes/index')
const adminRouter = require('./src/Admin/Routes/index')
const sendMail = require('./src/helper/mailer')
const fileUpload = require("express-fileupload");
var cors = require("cors");
async () => {
    await connectdb()
}
connectdb();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

app.listen(process.env.PORT);
