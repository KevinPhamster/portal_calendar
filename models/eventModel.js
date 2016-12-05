var mongoose = require('mongoose');
var schema = new mongoose.Schema({
   title: String,
   startDate: Date,
   endDate: Date,
   desc: String
});

schema.methods.hasConflicts = function() {
  console.log("Function Activated");
  var that = this;
  return new Promise(function(resolve, reject) {
    that.model('events').find({
      $or:
        [
          {startDate: {$lte:that.startDate}, endDate: {$gt: that.startDate}},
          {startDate: {$lte: that.endDate}, endDate: {$gte: that.endDate}}
        ]
      })
    .then(function(events){
      resolve(events.length !== 0)
    })
    .catch(function(err) {
      reject(err);
    });
  });
}

module.exports = mongoose.model('events', schema);
