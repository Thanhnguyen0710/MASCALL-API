const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chat = new Schema({
  createdDate: {type: Date, default: Date.now},
  updatedDate: {type: Date, default: Date.now},
  email: {type: Array},
  type: {type: String},
  content: {type: String || Array},
})

module.exports = mongoose.model('Chat', Chat);
