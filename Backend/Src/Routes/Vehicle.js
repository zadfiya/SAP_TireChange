const router = require("express").Router();
const {addVehicleIntoDB, getAllVehiclesFrmDB} = require("../Controller/Vehicle")

router.get("/list",getAllVehiclesFrmDB)
router.post('/add-vehicle',addVehicleIntoDB)

module.exports = router;