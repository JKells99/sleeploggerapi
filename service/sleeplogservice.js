const  SleepLog  = require('../models/SleepLog');


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

module.exports = {
    createNewNightSleepLog,
}