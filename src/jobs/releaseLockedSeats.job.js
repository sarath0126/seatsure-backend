import cron from "node-cron";
import { releaseExpiredLocks } from "../services/seat.service.js";
const startReleaseLockedSeatJobs = () => {
    cron.schedule("*/1 * * * *" , async () => {
        try{
            const releaseCount = await releaseExpiredLocks();
            if(releaseCount > 0) {
                console.log(`🕒 Released ${releasedCount} expired seat locks`);
            }
        }
        catch(error){
              console.error("❌ Error releasing seat locks", error);
        }
    })
}
export default startReleaseLockedSeatJobs;
