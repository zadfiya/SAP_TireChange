const router = require("express").Router();
const {getMasterTable} = require("../Controller/Master")

router.get("/data",getMasterTable)

module.exports = router;