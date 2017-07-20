 //src/routes/index.js
//const express = require('express');
const router = require('express').Router();
//const TrailInfo = require('../models/index');
const mongoose = require('mongoose');

//router.use('/doc', function(req, res, next) {
  //res.end(`Documentation http://expressjs.com/`);
//});

// GET /
router.get('/', function(req, res, next) {
    mongoose.model('TrailInfo').find({deleted: {$ne: true}}, function(err, files) {
        if (err) {
            console.log(err);
            return res.render('index');
        }
        res.json(files);
    });
        
        
});




//POST entries from form /
router.post('/', function(req, res, next){
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




router.put('/trailInfo/:trailId', function(req, res, next) {
    const TrailFile = mongoose.model('TrailInfo');
    const trailId = req.params.trailId;
    
    TrailFile.findById(trailId, function(err, file) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!file) {
            return res.status(404).json({message: "This File cannot be found??"});
        }
        
        trailFile.trailName = req.body.trailName;
        trailFile.trailLength = req.body.trailLength;
        trailFile.trailLocation = req.body.trailLocation;
        trailFile.trailDifficulty = req.body.trailDifficulty;
        trailFile.trailDescription = req.body.trailDescription;
        
        trailFile.save(function(err, savedFile) {
            res.json(savedFile);
        })
        
    })

});



router.delete('/trailInfo/:trailId', function(req, res, next) {
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



router.get('/trailInfo/:trailId', function(req, res, next) {
    const {trailId} = req.params;
    const trailFile = TrailInfo.find(entry => entry.id === trailId);
    if (!trailFile) {
        return res.status(404).end(`Could not find the file '${trailID}'`);
    }
    
    
    res.json(file);
});
   


    
 


    
    
    
/*router.post('/file', function(req, res, next) {
  const newId = '' + FILES.length;
  const data = req.body;
  data.id = newId;

  FILES.push(data);
  res.status(201).json(data);
});

router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.title = req.body.title;
  file.description = req.body.description;
  res.json(file);
});

router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

router.get('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

//router.get('/file/:fileId', function(req, res, next) {
  //res.end(`Reading file '${req.params.fileId}'`);
//});*/

module.exports = router;