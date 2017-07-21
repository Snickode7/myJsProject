 //src/routes/index.js
//const express = require('express');
const router = require('express').Router();
//const TrailInfo = require('../models/index');
const mongoose = require('mongoose');



router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});


// GET /
router.get('/trailLogs', function(req, res, next) {
    mongoose.model('TrailInfo').find({deleted: {$ne: true}}, function(err, files) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        res.json(files);
    });
        
        
});




//POST Route /

router.post('/trailLogs', function(req, res, next){
    const TrailFile = mongoose.model('TrailInfo');
    //create object with form input
    const trailData = {
       trailName : req.body.trailName,
       trailLength : req.body.trailLength,
       trailLocation : req.body.trailLocation,
       trailDifficulty : req.body.trailDifficulty,
       trailDescription : req.body.trailDescription
    };
    
    TrailFile.create(trailData, function(err, newFile) {
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    
        res.json(newFile);
    });   
});


//Editing Route

router.put('/trailLogs/:trailId', function(req, res, next) {
    const TrailFile = mongoose.model('TrailInfo');
    const trailId = req.params.fileId;
    
    TrailFile.findById(trailId, function(err, file) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!file) {
            return res.status(404).json({message: "This File cannot be found??"});
        }
        
        file.trailName = req.body.trailName;
        file.trailLength = req.body.trailLength;
        file.trailLocation = req.body.trailLocation;
        file.trailDifficulty = req.body.trailDifficulty;
        file.trailDescription = req.body.trailDescription;
        
        file.save(function(err, savedFile) {
            res.json(savedFile);
        })
        
    })

});


//Delete Route

router.delete('/trailLogs/:trailId', function(req, res, next) {
    const TrailFile = mongoose.model('TrailInfo');
    const trailId = req.params.trailId;
    
    TrailFile.findById(trailId, function(err, file) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!file) {
            return res.status(404).json({message: "File not found"});
        }
        
        file.deleted = true;
        
        file.save(function(err, erasedFile) {
            res.json(erasedFile);
        })
    })
});



router.get('/trailLogs/:trailId', function(req, res, next) {
    const {trailId} = req.params;
    const trailFile = TrailInfo.find(entry => entry.id === trailId);
    if (!trailFile) {
        return res.status(404).end(`Could not find the file '${trailID}'`);
    }
    
    
    res.json(file);
});
   


    
 



module.exports = router;