// const { MongoClient } = require('mongodb');
const { URI_DB } = require('../config/db-config');

// const client = new MongoClient(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// client.once('open', () => {
//   console.log('connected database')
// })

// module.exports = client;

const mongoose = require('mongoose');

connect = async () => {
  try {
    await mongoose.connect(URI_DB);
    console.log("connect successfully")
  }
  catch (error) {
    console.log("connect failure")
  }
   
}

module.exports = { connect };