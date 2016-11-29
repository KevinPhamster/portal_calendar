var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  desc: String
});

var eventModel = mongoose.model('event', eventSchema);

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
  newEvent.save(function(err,event){
    if(err){
      res.send(err);
    } else {
      res.json(event);
    }
  })
});

router.patch('/:eventId', function(req, res) {
  eventModel.findByIdAndUpdate(req.params.eventId, req.body, function(err) {
    if(err){
      res.send(err);
    } else {
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
