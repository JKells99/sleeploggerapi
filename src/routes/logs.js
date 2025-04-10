const express = require('express');
const router = express.Router();
const SleepLog = require('../models/SleepLog.js');
const {getYesterdayDate, getTodaysDate} = require("../utils/datefunctions");
const logger = require('../utils/logger.js');
const {createNewNightSleepLog, createMorningLog, getAllLogs} = require("../service/sleeplogservice");

router.get('/', (req, res) => {
    logger.info('GET / accessed');
    res.send('Hello from logs route');
})


router.post('/night', async (req, res) => {
    const date = getTodaysDate();
    const {night_mood, night_anxiety} = req.body;

    try{
      const [log, created] = await createNewNightSleepLog(date,night_mood, night_anxiety);
        if(!created){
            logger.warn("Log already exists for today", {log_date: date, night_mood, night_anxiety});
            return res.status(409).json({message: "Log already exists for today"});
        }
        logger.info("New Night log created", {log_date: date, night_mood, night_anxiety});
        return res.status(201).json({message: "Log created successfully", log});
    }catch(err){
        logger.error(err);
        return res.status(500).json({message: "Internal server error"});
    }

})

router.post('/morning', async (req, res) =>{
    const date = getYesterdayDate();
    const {morning_mood,sleepquality, morning_anxiety} = req.body;
    try{
        const log = await createMorningLog(date,morning_mood, morning_anxiety,sleepquality);
        return res.status(201).json({message: "Log created successfully", log});
    }catch(err){
        logger.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
})

router.get('/all', async (req, res) => {
    try{
        const logs = await getAllLogs();
        if(logs.status !== 200){
            return res.status(logs.status).json({logs});
        }
        logger.info("Logs retrieved successfully", {logs: logs.data});
        return res.status(200).json({message: "Logs retrieved successfully", logs: logs.data});
    }catch(err){

    logger.error(err);
    return res.status(500).json({message: "Internal server error"});

    }
})


router.put('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {night_mood, night_anxiety, morning_mood, sleepquality, morning_anxiety} = req.body;

    try{
        const log = await SleepLog.findByPk(id);
        if(!log){
            logger.warn("No log found with id", {id});
            return res.status(404).json({message: "No log found with id"});
        }
        log.night_mood = night_mood;
        log.night_anxiety = night_anxiety;
        log.morning_mood = morning_mood;
        log.sleepquality = sleepquality;
        log.morning_anxiety = morning_anxiety;
        await log.save();
        logger.info("Log updated", {id, night_mood, night_anxiety, morning_mood, sleepquality, morning_anxiety});
        return res.status(200).json({message: "Log updated successfully", log});
    }catch(err){
        logger.error(err);
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router;