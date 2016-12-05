var express = require('express');
var router = express.Router();
var eventModel = require('../models/eventModel');

router.get('/', function(req, res, next) {
  eventModel.find({}, function(err, events) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(events);
      }
  });
});

router.post('/', function(req, res) {
  var newEvent = new eventModel(req.body);
  newEvent.hasConflicts().then(function(hasConflicts){
    console.log(hasConflicts);
    if(!hasConflicts){
      newEvent.save(function (err, event) {
        if(err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(event);
          res.json(event);
        }
      })
    }
  });
  res.end();
});

router.patch('/:eventId', function(req, res) {
  eventModel.findByIdAndUpdate(req.params.eventId, req.body, function(err) {
    if(err){
      res.send(err);
    } else {
      if(eventModel.find(
        {
          $or: [
                {
                  startDate: {$gte: req.body.startDate.getTime(), $lt: req.body.endDate.getTime()}
                },
                {
                  startDate: {$lt: req.body.startDate.getTime()},
                  endDate: {$gt: req.body.startDate.getTime(), $lt: req.body.endDate.getTime()}
                }
               ]
        }
      ))
      res.json(req.body);
    }
  })
});

router.delete('/:eventId', function(req, res) {
  eventModel.findByIdAndRemove(req.params.eventId, function(err) {
    if(err){
      res.send(err);
    } else {
      res.json({success: true, removed: req.body});
    }
  })
});

module.exports = router;
