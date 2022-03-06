const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatRoom = new Schema({
  updatedDate: {type: Date, default: Date.now},
  email: {type: Array},
  name: {type: String},
  photoURL: {type: String},
  lastMessage: {type: String},
})

module.exports = mongoose.model('ChatRoom', ChatRoom);
