const asyncHandler = require("../middleware/async");
const Booking = require("../model/bookingModel");
const {give_response} = require("../helper/helper")

const saveBookingToDB = asyncHandler(async(req,res,next)=>{
    let {date,data} = req.body
    date = date.split(" ")[0]
    let booking = await Booking.findOne({date:date })
    if(booking)
    {
        booking.data.Bookings.push(data.Bookings[0])
        await booking.save()
        
    }
    else
    {
        const objToSave = {}
        let vehicleWiseIds=["65ac38201345cb2eea7dd1c1","65ac382f1345cb2eea7dd1c4","65ac38341345cb2eea7dd1c6","65ac38651345cb2eea7dd1c8","65ac38701345cb2eea7dd1ca"]
    
        objToSave.vehicleWise=vehicleWiseIds.map(id=> ({vehicleid:id}))
        req.body.data['vehicleWise'] = objToSave.vehicleWise
        booking = await Booking.create(req.body)
    }
    await booking.bookingSave(data.Bookings[0],next)

    give_response(res,200,true,"Booking Added",booking)
})

const getAllBookingsFrmDB = asyncHandler(async(req,res)=>{
    const bookingList = await Booking.find().populate({path:"data.Bookings.vehicleType",select:"name"})
    give_response(res,200,true,"",bookingList)
})

const getBookingByDate = asyncHandler(async(req,res)=>{
    let {date} = req.params
    let formattedDate = date.split('T')[0];
    const booking = await Booking.findOne({date:formattedDate}).populate({path:"data.Bookings.vehicleType",select:"charge"})
    if(booking)
    {
        give_response(res,200,`Statistics for Date: ${formattedDate}`,booking)
    }
    else
    {
        give_response(res,201,`Statistics not found for Date: ${formattedDate}`)
    }
})

const addDummyData  = asyncHandler(async(req,res)=>{
    const aggregateResult = await Booking.aggregate([
        // Overall aggregation
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$data.totalRevenue' },
            totalTurnedAway: { $sum: '$data.totalTurnedAway' },
            acceptedCustomers: { $sum: '$data.acceptedCustomers' },
            turnedAwayCustomers: { $sum: '$data.turnedAwayCustomers' },
          },
        },
        // Aggregation for each unique vehicleid
        {
          $unwind: '$data.vehicleWise',
        },
        {
          $group: {
            _id: '$data.vehicleWise.vehicleid',
            totalRevenue: { $sum: '$data.vehicleWise.totalRevenue' },
            totalTurnedAway: { $sum: '$data.vehicleWise.totalTurnedAway' },
            acceptedCustomers: { $sum: '$data.vehicleWise.acceptedCustomers' },
            turnedAwayCustomers: { $sum: '$data.vehicleWise.turnedAwayCustomers' },
          },
        },
      ]);
    give_response(res,200,true,"",aggregateResult)
})

const csvToDB=async (body)=>{
    // let booking = await Booking.findOne({date:date })
    // if(booking)
    // {
    //     booking.data.Bookings= data.Bookings
    //     await booking.save()
    // }
    // else
    // {
        // console.log(body.data);
        let booking = await Booking.create(body)
    // }
}

const walkin = asyncHandler(async(req,res)=>{
    let {date,bay,vehicleType} = req.body
    const availableBookings = await Booking.find({
        date: date,
        'data.Bookings': {
          $elemMatch: {
            $and:[{$or: [
                { bay: { $exists: false } }, // Include documents where 'bay' does not exist
                { bay: bay },
                { bay: { $gt: 5 } }
              ],},{status:"Serviced"}]
            
            
          }
        }
      });
        give_response(res,200,true,"",availableBookings)
})

module.exports = {saveBookingToDB,getAllBookingsFrmDB,getBookingByDate,addDummyData,csvToDB,walkin}
