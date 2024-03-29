const asyncHandler = require("../middleware/async");
const Vehicle = require("../model/vehicleModel");
const {give_response} = require("../helper/helper")

const addVehicleIntoDB = asyncHandler(async(req,res)=>{
    const vehicle = await Vehicle.create(req.body)
    give_response(res,200,true,"Vehicle Added",vehicle)
})

const getAllVehiclesFrmDB = asyncHandler(async(req,res)=>{
    const vehicleList = await Vehicle.find()
    give_response(res,200,true,"",vehicleList)
})

module.exports = {addVehicleIntoDB,getAllVehiclesFrmDB}