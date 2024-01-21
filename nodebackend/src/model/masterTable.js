const mongoose = require("mongoose");
const {vehicleChargeById} = require("../helper/helper")
const MasterSchema = new mongoose.Schema(
    {
        totalRevenue:{
            type:Number,
            default:0
        },
        totalTurnedAway:{
            type:Number,
            default:0
        },
        acceptedCustomers:{
            type:Number,
            default:0
        },
        turnedAwayCustomers:{
            type:Number,
            default:0 
        },
        vehicleWise:[
            {
                id:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Vehicle"
                },
                totalRevenue:{
                    type:Number,
                    default:0
                },
                totalTurnedAway:{
                    type:Number,
                    default:0
                },
                acceptedCustomers:{
                    type:Number,
                    default:0
                },
                turnedAwayCustomers:{
                    type:Number,
                    default:0 
                }, 
            }
        ]
        
    },
    {
        timestamps:true
    }
)
let count = 0;

MasterSchema.methods.updateTable = async function (vehicleWise){
    const statistics = this

    for(let data of vehicleWise){
        for(let stats of statistics.vehicleWise){
            if(data.vehicleid._id.toString() == stats.id.toString())
            { 
                stats.totalRevenue += data.totalRevenue
                stats.totalTurnedAway += data.totalTurnedAway
                stats.acceptedCustomers += data.acceptedCustomers
                stats.turnedAwayCustomers += data.turnedAwayCustomers
            }
        }
    }
  
    for(let item of statistics.vehicleWise)
    {
        statistics.totalRevenue+= item.totalRevenue
        statistics.totalTurnedAway+= item.totalTurnedAway
        statistics.acceptedCustomers+= item.acceptedCustomers
        statistics.turnedAwayCustomers+= item.turnedAwayCustomers
    }

    await statistics.save()
}

module.exports = mongoose.model("Master", MasterSchema);