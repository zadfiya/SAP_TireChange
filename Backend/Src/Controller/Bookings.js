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
    const booking = await Booking.findOne({date:formattedDate})
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