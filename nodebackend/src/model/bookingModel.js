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
    // console.log(this, this.totalTurnedAway, this.totalRevenue);
    const formattedDate = this.date.split(' ')[0]; // Get the date in 'yyyy-mm-dd' format
    booking.date = formattedDate;

    
    
    next();
});

// BookingSchema.pre('save', async function(next) {
//     const booking = this;
  
//     // Populate vehicleType for all Bookings
//     await booking.populate([{path:'data.Bookings.vehicleType',select:"charge"}]);
  
//     // Calculate total revenue and total turned away based on Bookings
//     booking.data.totalReveneue = booking.data.Bookings
//     .filter(booking => ['Booked', 'Serviced'].includes(booking.status))
//     .reduce((total, booking) => total + booking.vehicleType.charge, 0);

//     booking.data.totalTurnedaway = booking.data.Bookings
//     .filter(booking => booking.status === 'TurnedAway')
//     .reduce((total, booking) => total + booking.vehicleType.charge, 0);

//     // booking.data.Bookings.forEach(newBooking => {
//     //     if (['Booked', 'Serviced'].includes(newBooking.status)) {
//     //         booking.data.totalReveneue += newBooking.vehicleType.charge;
//     //     } else if (newBooking.status === 'TurnedAway') {
//     //         booking.data.totalTurnedaway += newBooking.vehicleType.charge;
//     //     }
//     //   });

//     next();
// });


BookingSchema.post("save",async function (next)
{
    const booking = this
    await booking.populate([{path:'data.vehicleWise.vehicleid',select:"name charge"}]);
    let masterTableObj = await MasterTable.findById("65ad1b05d989a7203c8d9f57")
    await masterTableObj.updateTable(booking.data.vehicleWise)
    
})

// BookingSchema.methods.bookingSave = async function (bookObjs)
// {
//     const booking = this
    
//     await booking.populate([{path:'data.vehicleWise.vehicleid',select:"name charge"}]);
//     for(let bookObj of bookObjs)
//     {
//         if(bookObj.status =="TurnedAway")
//         {
//             booking.data.totalTurnedaway += vehicleChargeById(bookObj.vehicleType)
//             booking.data.turnedAwayCustomers +=1
//         }
//         else
//         {
//             booking.data.totalReveneue +=vehicleChargeById(bookObj.vehicleType)
//             booking.data.acceptedCustomers +=1
//         }
//     }
//     await booking.save()
//         let masterTableObj = await MasterTable.findOne({})
//     if(!masterTableObj)
//     {
//         const objToSave = {}
//         let vehicleWiseIds=["65ac38201345cb2eea7dd1c1","65ac382f1345cb2eea7dd1c4","65ac38341345cb2eea7dd1c6","65ac38651345cb2eea7dd1c8","65ac38701345cb2eea7dd1ca"]
    
//         objToSave.vehicleWise=vehicleWiseIds.map(id=> ({id:new mongoose.Types.ObjectId(id)}))
//         masterTableObj = await MasterTable.create(objToSave)
//     }
//     //await masterTableObj.updateTable(bookObj)   
    
// }

// BookingSchema.methods.bookingSave2 = async function (bookObjs)
// {
//     const booking = this
    
//     await booking.populate([{path:'data.vehicleWise.vehicleid',select:"name charge"}]);
//     if(bookObj.status =="TurnedAway")
//     {
//         booking.data.totalTurnedaway += vehicleChargeById(bookObj.vehicleType)
//         booking.data.turnedAwayCustomers +=1
//     }
//     else
//     {
//         booking.data.totalReveneue +=vehicleChargeById(bookObj.vehicleType)
//         booking.data.acceptedCustomers +=1
//     }
//     booking.data.vehicleWise.forEach(element => {
//         if(element.vehicleid._id ==bookObj.vehicleType)
//         {
//             if(bookObj.status =="TurnedAway")
//             {
//               element.totalTurnedaway+= element.vehicleid.charge
//               element.turnedAwayCustomers+= 1
//             }
//             else
//             {
//                 element.totalReveneue+= element.vehicleid.charge
//                 element.acceptedCustomers+= 1
//             }
//         }
//     });
//     await booking.save()
//         let masterTableObj = await MasterTable.findOne({})
//     if(!masterTableObj)
//     {
//         const objToSave = {}
//         let vehicleWiseIds=["65ac38201345cb2eea7dd1c1","65ac382f1345cb2eea7dd1c4","65ac38341345cb2eea7dd1c6","65ac38651345cb2eea7dd1c8","65ac38701345cb2eea7dd1ca"]
    
//         objToSave.vehicleWise=vehicleWiseIds.map(id=> ({id:new mongoose.Types.ObjectId(id)}))
//         masterTableObj = await MasterTable.create(objToSave)
//     }   
//     await masterTableObj.updateTable(bookObj)
// }

// BookingSchema.post('save', async function (next) {
//     const booking = this;
//     console.log("Booking obj from post method\n",booking)
//     let masterTableObj = await MasterTable.findOne({})
//     if(!masterTableObj)
//     {
//         const objToSave = {}
//         let vehicleWiseIds=["65ac38201345cb2eea7dd1c1","65ac382f1345cb2eea7dd1c4","65ac38341345cb2eea7dd1c6","65ac38651345cb2eea7dd1c8","65ac38701345cb2eea7dd1ca"]
    
//         objToSave.vehicleWise=vehicleWiseIds.map(id=> ({id:new mongoose.Types.ObjectId(id)}))
//         masterTableObj = await MasterTable.create(objToSave)
//     }   
//     await masterTableObj.updateTable({})
//   });


module.exports = mongoose.model("Bookings", BookingSchema);