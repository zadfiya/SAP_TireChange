const asyncHandler = require("../Middleware/async");
const Master = require("../Model/Master");
const {give_response} = require("../helper/helper")


const getMasterTable = asyncHandler(async(req,res)=>{
    const masterTable = await Master.findOne({}).populate({
        path: 'vehicleWise.id',
        model: 'Vehicle', // The model to use for population
        select: 'name charge', // The fields to select from the Vehicle model
      });
      
    give_response(res,200,true,"",masterTable)
})

module.exports = {getMasterTable}