import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

import startReleaseLockedSeatsJob from "./jobs/releaseLockedSeats.job.js";


dotenv.config();

const PORT = process.env.PORT || 3000;


const startServer = async () => {
    try {
        await connectDB();
        startReleaseLockedSeatsJob();
        app.listen(PORT , () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Failed to Start Server" , error);
        process.exit(1);
    }
}
startServer();