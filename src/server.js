const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');

const trailTrackerApp = express();

const publicPath = path.resolve(__dirname, '../public');
trailTrackerApp.use(express.static(publicPath));

trailTrackerApp.use('/api', router);

trailTrackerApp.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});


