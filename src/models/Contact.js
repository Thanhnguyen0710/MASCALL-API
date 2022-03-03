const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Contact = new Schema({
  displayName: {type : String},
  phoneNumber: {type: String},
  photoURL: {type: String},
  email: {type: String},
  emailMe: {type: String},
  isUser: {type: Boolean, default: false},
})

module.exports = mongoose.model('Contact', Contact);
