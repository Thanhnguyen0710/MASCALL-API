const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CallHistory = new Schema({
  from: {type: String},
  to: {type: String},
  isMissedCall: {type: Boolean},
  time: {type: Number},
  user: {type: Object},
  createdDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('CallHistory', CallHistory);