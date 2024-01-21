const mongoose = require("mongoose");
const VehicleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Please add a vehicle name"],
        },
        servicetime:{
            type:Number,
            min:0
        },
        charge:{
            type:Number,
            min:0
        }
    },
    {
        timestamps: true,
    }
)
const Vehicle = mongoose.model("Vehicle", VehicleSchema)
module.exports = Vehicle;
