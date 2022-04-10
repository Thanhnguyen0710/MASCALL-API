const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatRoom = new Schema({
  updatedDate: {type: Date, default: Date.now},
  email: {type: Array},
  user: {type: Array},
  name: {type: String},
  photoURL: {type: String},
  messages: [
    {
      type: {type: String, required: true},
      email: {type: String, required: true},
      content: {type: String},
      contents: {type: Array},
      createdDate: {type: Date, default: Date.now}
    }
  ],
  unSeens: [
    {
      email: {type: String, required: true},
      countMess: {type: Number, default: 0},
    }
  ]
})

module.exports = mongoose.model('ChatRoom', ChatRoom);
