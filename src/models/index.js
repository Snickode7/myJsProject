var mongoose = require('mongoose');

var TrailSchema = new mongoose.Schema({
    trailName: String,
        
    trailLength: String,
        
    trailLocation: String,
        
    trailDifficulty: String,
        
    trailDescription: String,
});


var TrailInfo = mongoose.model('TrailInfo', TrailSchema);

module.exports = TrailInfo;

TrailInfo.count({}, function(err, count) {
    if(err) {
        throw err;
    }
    
    if (count > 0) return;
    
    const trailsInfo = require('./trail.json');
    
    TrailInfo.create(trailsInfo, function(err, newTrailsInfo) {
        if (err) {
            throw err;
        }
    console.log("TrailLogs seeded");
    });
});