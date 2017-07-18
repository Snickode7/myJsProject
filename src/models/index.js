var mongoose = require('mongoose');

var TrailSchema = new mongoose.Schema({
    trailName: {
        type: String,
        required: true,
        trim: true,
    },
    trailLength: {
        type: String,
        required: true,
        trim: true,
    },
    trailLocation: {
        type: String,
        required: true,
        trim: true,
    },
    trailDifficulty: {
        type: String,
        required: true,
        trim: true,
    },
    trailDescription: {
        type: String,
        required: true,
        trim: true
    }
});

var TrailInfo = mongoose.model('TrailInfo', TrailSchema);
module.exports = TrailInfo;