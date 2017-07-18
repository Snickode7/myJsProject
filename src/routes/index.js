 //src/routes/index.js
const express = require('express');
const router = require('express').Router();
var TrailInfo = require('../models/index')

router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});


//GET entries from form /trailInfo
router.get('/trailInfo', function(req, res, next) {
   return res.render('trailInfo');
});

//POST entries from form /trailInfo
router.post('/trailInfo', function(req, res, next){
    //create object with form input
    var trailData = {
       trailName: req.body.trailName,
       trailLength: req.body.trailLength,
       trailLocation: req.body.trailLocation,
       trailDifficulty: req.body.trailDifficulty,
       trailDescription: req.body.trailDescription
    };
   
    
    //Insert document into mongo
    TrailInfo.create(trailData, function(error, trailInfo) {
        if (error) {
           return next(error); 
        }
    
    });
});

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
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