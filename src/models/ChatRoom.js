const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatRoom = new Schema({
  updatedDate: {type: Date, default: Date.now},
  email: {type: Array},
  name: {type: String},
  photoURL: {type: String},
  messages: [
    {
      type: {type: String, required: true},
      email: {type: String, required: true},
      content: {type: String,  required: true},
      createdDate: {type: Date, default: Date.now}
    }
  ]
})

module.exports = mongoose.model('ChatRoom', ChatRoom);
