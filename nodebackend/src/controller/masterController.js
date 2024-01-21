const asyncHandler = require("../middleware/async");
const Master = require("../model/masterTable");
const {give_response} = require("../helper/helper")


const getMasterTable = asyncHandler(async(req,res)=>{
    const masterTable = await Master.findOne({}).populate({
        path: 'vehicleWise.id',
        model: 'Vehicle', // The model to use for population
        select: 'name charge', // The fields to select from the Vehicle model
      });
      
    give_response(res,200,true,"",masterTable)
})

const addMasterTable = asyncHandler(async(req,res)=>{

    const objToSave = {}
        let vehicleWiseIds=["65ac38201345cb2eea7dd1c1","65ac382f1345cb2eea7dd1c4","65ac38341345cb2eea7dd1c6","65ac38651345cb2eea7dd1c8","65ac38701345cb2eea7dd1ca"]
    
        objToSave.vehicleWise=vehicleWiseIds.map(id=> ({id:id}))
       const masterTableObj = await Master.create(objToSave)
    give_response(res,200,true,"",masterTableObj)
})

module.exports = {getMasterTable,addMasterTable}