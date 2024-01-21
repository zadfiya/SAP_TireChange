const router = require("express").Router();
const {addVehicleIntoDB, getAllVehiclesFrmDB} = require("../controller/vehicleController")

router.get("/list",getAllVehiclesFrmDB)
router.post('/add-vehicle',addVehicleIntoDB)

module.exports = router;