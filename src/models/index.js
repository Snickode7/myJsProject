/*Schema for the Mongoose*/



var mongoose = require('mongoose');

var TrailSchema = new mongoose.Schema({
    trailName: String,
        
    trailLength: String,
        
    trailLocation: String,
        
    trailDifficulty: String,
        
    trailDescription: String,
    
    created_at: { type: Date, default: Date.now },
    
    deleted: {type: Boolean, default: false}
});


var TrailInfo = mongoose.model('TrailInfo', TrailSchema);

module.exports = TrailInfo;

TrailInfo.count({}, function(err, count) {
    if(err) {
        throw err;
    }
    
    if (count > 0) return;
    
    const trailFiles = require('./trail.json');
    
    TrailInfo.create(trailFiles, function(err, newFiles) {
        if (err) {
            throw err;
        }
    console.log("TrailLogs seeded");
    });
});