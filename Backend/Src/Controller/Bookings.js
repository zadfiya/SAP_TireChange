const asyncHandler = require("../Middleware/async");
const Booking = require("../Model/Booking");
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
        give_response(res,400,`Statistics not found for Date: ${formattedDate}`)
    }
})

module.exports = {saveBookingToDB,getAllBookingsFrmDB,getBookingByDate}