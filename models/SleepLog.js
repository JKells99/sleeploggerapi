const {DataTypes} = require('sequelize');
const sequelize = require('../db/index.js');

const SleepLog = sequelize.define('SleepLog', {
    log_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
    },
    night_mood:DataTypes.TEXT,
    night_anxiety:DataTypes.INTEGER,
    morning_mood:DataTypes.TEXT,
    sleepquality:DataTypes.TEXT,
    morning_anxiety:DataTypes.INTEGER,
},{
    tableName: 'sleep_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});
module.exports = SleepLog;