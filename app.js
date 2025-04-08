const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const limiter = require('./utils/ratelimiter.js');

const sleepLogRoutes = require('./routes/logs.js');
const sequelize = require('./db/index.js');
require('dotenv').config();

app.use(cors());
app.use(limiter);
app.use(bodyParser.json());
app.use('/logs', sleepLogRoutes);

sequelize.sync().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
    console.log('✅ Database synchronized');
})

module.exports = app;