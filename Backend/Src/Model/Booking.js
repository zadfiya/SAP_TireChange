const mongoose = require("mongoose");
const MasterTable = require("./Master");
const Vehicle = require("./Vehicle");
const {vehicleChargeById} = require("../helper/helper")
const BookingSchema = new mongoose.Schema(
    {
        date:{
            type:String,
            require:true,
            unique:[true,"Date Must be Unique"]
        },
        data:{
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
            Bookings:[
                {
                    timestamps:{
                        require:true,
                        type:Date
                    },
                    bay:{
                        require:true,
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
            ]
        }

    },
    {
        timestamps:true
    }
)

BookingSchema.pre('save', function (next) {
    
    const formattedDate = this.date.split(' ')[0]; // Get the date in 'yyyy-mm-dd' format
    this.date = formattedDate;
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

BookingSchema.methods.bookingSave = async function (bookObj,next)
{
    const booking = this
    
    await booking.populate([{path:'data.Bookings.vehicleType',select:"charge"}]);
    const {vehicleType} = bookObj.vehicleType
    if(bookObj.status =="TurnedAway")
    {
        booking.data.totalTurnedaway += vehicleChargeById(bookObj.vehicleType)
        booking.data.turnedAwayCustomers +=1
    }
    else
    {
        booking.data.totalReveneue +=vehicleChargeById(bookObj.vehicleType)
        booking.data.acceptedCustomers +=1

    }
    await booking.save()
        let masterTableObj = await MasterTable.findOne({})
    if(!masterTableObj)
    {
        const objToSave = {}
        let vehicleWiseIds=["65ac38201345cb2eea7dd1c1","65ac382f1345cb2eea7dd1c4","65ac38341345cb2eea7dd1c6","65ac38651345cb2eea7dd1c8","65ac38701345cb2eea7dd1ca"]
    
        objToSave.vehicleWise=vehicleWiseIds.map(id=> ({id:new mongoose.Types.ObjectId(id)}))
        masterTableObj = await MasterTable.create(objToSave)
    }   
    await masterTableObj.updateTable(bookObj,next)
}

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