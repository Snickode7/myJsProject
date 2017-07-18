const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const trailTrackerApp = express();

// Mongo connection
mongoose.connect('mongodb://localhost:27017/trailLogs');
var db = mongoose.connection;
//Incase of Mongo Error
db.on('error', console.error.bind(console, 'connection'));


// Body parser
trailTrackerApp.use(bodyParser.json());




//Serve the static files
const publicPath = path.resolve(__dirname, '../public');
trailTrackerApp.use(express.static(publicPath));

trailTrackerApp.use('/api', router);

trailTrackerApp.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});









/*trailTrackerApp.use(function(req, res, next) {
  console.log("req.body BEFORE parsing", req.body);
  next();
});



trailTrackerApp.use(function(req, res, next) {
  console.log("req.body AFTER parsing", req.body);
  next();
});*/