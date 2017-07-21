
//All the stuff the server requires (very important)

const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const express = require('express');
const config = require('./config');
const router = require('./routes');





// Mongo connection
mongoose.connect('mongodb://localhost:27017/trailLogs');
var db = mongoose.connection;
//Incase of Mongo Error
db.on('error', console.error.bind(console, 'connection'));

//Import the Models
require('./models/index.js');


const trailTrackerApp = express();




//Serve the static files
const publicPath = path.resolve(__dirname, '../public');
trailTrackerApp.use(express.static(publicPath));

// Body parser
trailTrackerApp.use(bodyParser.json());




trailTrackerApp.use('/api', router);

//Starts the server
trailTrackerApp.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});





