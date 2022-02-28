const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  displayName: {type : String},
  phoneNumber: {type: String},
  photoURL: {type: String},
  email: {type: String},
  emailVerified: {type: Boolean},
  isAnonymous: {type: Boolean},
  uid: {type: String},
})

module.exports = mongoose.model('User', User);
