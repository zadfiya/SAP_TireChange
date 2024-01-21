const mongoose = require("mongoose");
const MasterTable = require("./masterTable");
const {vehicleChargeById} = require("../helper/helper")
const BookingSchema = new mongoose.Schema(
    {
        date:{
            type:String,
            require:true,
            unique:[true,"Date Must be Unique"]
        },
        data:{
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
            Bookings:[
                {
                    timestamps:{
                        require:true,
                        type:Date
                    },
                    bay:{
                        type:Number,
                    },
                    startTime:{
                        require:true,
                        type:Date
                    },
                    endTime:{
                        require:true,
                        type:Date
                    },
                    vehicleType:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Vehicle"
                    },
                    status:{
                        require:true,
                        type:String,
                        enum: ["Booked", "Serviced","TurnedAway"],
                    }
                }
            ],
            vehicleWise:[
                {
                    vehicleid:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Vehicle"
                    },
                    totalRevenue:{
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
                    totalTurnedAway:{
                        type:Number,
                        default:0
                    }
                    
                }
            ]
        }

    },
    {
        timestamps:true
    }
)

BookingSchema.pre('save', async function (next) {
    const booking = this
    const formattedDate = this.date.split(' ')[0]; // Get the date in 'yyyy-mm-dd' format
    booking.date = formattedDate;
    next();
});

BookingSchema.post("save",async function (next)
{
    const booking = this
    await booking.populate([{path:'data.vehicleWise.vehicleid',select:"name charge"}]);
    let masterTableObj = await MasterTable.findById("65ad1b05d989a7203c8d9f57")
    await masterTableObj.updateTable(booking.data.vehicleWise)
    
})

module.exports = mongoose.model("Bookings", BookingSchema);