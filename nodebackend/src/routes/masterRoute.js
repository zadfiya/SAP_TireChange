const router = require("express").Router();
const {getMasterTable,addMasterTable} = require("../controller/masterController")

router.get("/data",getMasterTable)
router.post("/dummy",addMasterTable)
module.exports = router;