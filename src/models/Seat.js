import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        index : true
    },

    seatNumber : {
        type : String,
        required : true
    },

    status : {
        type : String,
        enum : ["AVAILABLE" , "LOCKED" , "BOOKED"],
        default : "AVAILABLE",
        index : true
    },

    lockedBy : {
        type : mongoose.Schema.Types.ObjectId,
        default : null
    },

    lockedAt : {
        type : Date,
        default : null
    },

     lockExpiresAt: {
        type : Date,
        default : null,
        index : true
    }

},{timestamps : true})


// Prevents Duplications 
seatSchema.index({eventId : 1 , seatNumber : 1} , {unique:true});
export const Seat = mongoose.model("Seat" , seatSchema);