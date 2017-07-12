const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');

const trailTrackerApp = express();

trailTrackerApp.use(function(req, res, next) {
  console.log("req.body BEFORE parsing", req.body);
  next();
});

trailTrackerApp.use(bodyParser.json());

trailTrackerApp.use(function(req, res, next) {
  console.log("req.body AFTER parsing", req.body);
  next();
});



const publicPath = path.resolve(__dirname, '../public');
trailTrackerApp.use(express.static(publicPath));

trailTrackerApp.use('/api', router);

trailTrackerApp.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});


