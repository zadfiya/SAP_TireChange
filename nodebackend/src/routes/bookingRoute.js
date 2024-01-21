const router = require("express").Router()
const {saveBookingToDB, getAllBookingsFrmDB, getBookingByDate, addDummyData,csvToDB} = require("../controller/bookingController")
router.get("/list",getAllBookingsFrmDB)
router.post("/add-booking",saveBookingToDB)
router.get("/date/:date",getBookingByDate)
router.post("/dummy",addDummyData)


module.exports = router;