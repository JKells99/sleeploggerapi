const  SleepLog  = require('../models/SleepLog');
const {getYesterdayDate} = require("../utils/datefunctions");
const logger = require("../utils/logger");


const createNewNightSleepLog = async (date,night_mood,night_anxiety)  => {
    const [log, created] = await SleepLog.findOrCreate({
        where: { log_date: date },
        defaults: {
            night_mood,
            night_anxiety,
        }
    })
    return [log, created];
}

const createMorningLog = async (date, morning_mood, sleepquality, morning_anxiety) => {
    try {
        const log = await SleepLog.findOne({ where: { log_date: date } });

        if (!log) {
            logger.warn("No log found for yesterday", { log_date: date });
            return { status: 404, success: false, message: "No log found for yesterday" };
        }

        log.morning_mood = morning_mood;
        log.morning_anxiety = morning_anxiety;
        log.sleepquality = sleepquality;
        await log.save();

        logger.info("Morning log updated", { log_date: date, morning_mood, morning_anxiety,sleepquality });

        return {
            status: 200,
            success: true,
            message: "Log updated successfully",
            data: log
        };
    } catch (err) {
        logger.error("Error updating morning log", { error: err });
        return {
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        };
    }
};

module.exports = {
    createNewNightSleepLog,
    createMorningLog
}