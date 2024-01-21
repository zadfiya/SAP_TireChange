const router = require("express").Router()
const {saveBookingToDB, getAllBookingsFrmDB, getBookingByDate} = require("../Controller/Bookings")

router.get("/list",getAllBookingsFrmDB)
router.post("/add-booking",saveBookingToDB)
router.get("/date/:date",getBookingByDate)

module.exports = router;