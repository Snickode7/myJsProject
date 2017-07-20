
const express = require('express');
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// Mongo connection
mongoose.connect('mongodb://localhost:27017/trailLogs');
var db = mongoose.connection;
//Incase of Mongo Error
db.on('error', console.error.bind(console, 'connection'));

//Import the Models
require('./models/index.js');


const trailTrackerApp = express();


// Body parser
trailTrackerApp.use(bodyParser.json());

// Pug Setup
trailTrackerApp.set('view engine', 'pug');
trailTrackerApp.set('views', __dirname + '/../views');


trailTrackerApp.use(express.static(__dirname + '/../public'));

trailTrackerApp.use('', router);


trailTrackerApp.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});




/*//Serve the static files
const publicPath = path.resolve(__dirname, '../public');
trailTrackerApp.use(express.static(publicPath));











// Include all of the routes
var routes = require('./routes/index');
trailTrackerApp.use('/', routes);








/*trailTrackerApp.use(function(req, res, next) {
  console.log("req.body BEFORE parsing", req.body);
  next();
});



trailTrackerApp.use(function(req, res, next) {
  console.log("req.body AFTER parsing", req.body);
  next();
});*/