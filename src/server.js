const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');

const trailFinderApp = express();

const publicPath = path.resolve(__dirname, '../public');
trailFinderApp.use(express.static(publicPath));

trailFinderApp.use('/api', router);

trailFinderApp.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});


