const mongoose = require("mongoose");
const {vehicleChargeById} = require("../helper/helper")
const MasterSchema = new mongoose.Schema(
    {
        totalReveneue:{
            type:Number,
            default:0
        },
        totalTurnedaway:{
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
                totalReveneue:{
                    type:Number,
                    default:0
                },
                totalTurnedaway:{
                    type:Number,
                    default:0
                }
                
            }
        ]
    },
    {
        timestamps:true
    }
)




MasterSchema.methods.updateTable = async function (bookObj,next){
    const statistics = this
    statistics.vehicleWise.forEach(data=>{
        if(data.id.toString() == bookObj.vehicleType.toString())
        {
            if(bookObj.status=="TurnedAway")
            {
                data.totalTurnedaway+=vehicleChargeById(bookObj.vehicleType)
                statistics.turnedAwayCustomers += 1
            }
            else
            {
                data.totalReveneue+=vehicleChargeById(bookObj.vehicleType)
                statistics.acceptedCustomers += 1
            }
        }
    })
    statistics.totalReveneue = statistics.vehicleWise.reduce((total, vehicleWiseData) => total + vehicleWiseData.totalReveneue, 0);
    statistics.totalTurnedaway = statistics.vehicleWise.reduce((total, vehicleWiseData) => total + vehicleWiseData.totalTurnedaway, 0);
    await statistics.save()
}

  

module.exports = mongoose.model("Master", MasterSchema);