import {Seat} from "../models/Seat.js"

const LOCK_DURATION_MINUTES = 5;


export const lockSeat = async ({seatId , userId}) => {
    const now = new Date();

    const lockExpiresAt = new Date(
        now.getTime() + LOCK_DURATION_MINUTES * 60 * 1000
    );

    const seat = await Seat.findOneAndUpdate (
        {
           _id : seatId,
            status : "AVAILABLE"
        },

        {
            status : "LOCKED",
            lockedBy :  userId,
            lockedAt : now,
            lockExpiresAt
        },
        {
            new : true
        }
    )

    if(!seat) {
        throw new Error("Seat is not available for locking")
    }

    return seat;
}


export const releaseExpiredLocks = async () => {
    const now = new Date();
    const result = await Seat.updateMany(
        {
            status : "LOCKED",
            lockExpiresAt: { $lt: now },
        },
        {
            status : "AVAILABLE",
            lockedBy : null,
            lockedAt : null,
            lockExpiresAt : null,
        }
    )

    return result.modifiedCount;
}


