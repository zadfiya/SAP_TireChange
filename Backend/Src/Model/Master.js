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


MasterSchema.post('save', async function() {
    const statistics = this;
    console.log("master Obj\n"+JSON.stringify(statistics," ",4))
    statistics.totalReveneue = statistics.vehicleWise.reduce((total, vehicleWiseData) => total + vehicleWiseData.totalReveneue, 0);
    statistics.totalTurnedaway = statistics.vehicleWise.reduce((total, vehicleWiseData) => total + vehicleWiseData.totalTurnedaway, 0);
  });

MasterSchema.methods.updateTable = async function (bookObj,next){
    const statistics = this
    console.log(bookObj)
    statistics.vehicleWise.forEach(data=>{
        if(data.id.toString() == bookObj.vehicleType.toString())
        {
            if(bookObj.status=="TurnedAway")
                data.totalTurnedaway+=vehicleChargeById(bookObj.vehicleType)
            else
                data.totalReveneue+=vehicleChargeById(bookObj.vehicleType)
        }
    })
    await statistics.save()
    next()
}

  

module.exports = mongoose.model("Master", MasterSchema);