const router = require("express").Router()
const {saveBookingToDB, getAllBookingsFrmDB} = require("../Controller/Bookings")

router.get("/list",getAllBookingsFrmDB)
router.post("/add-booking",saveBookingToDB)

module.exports = router;