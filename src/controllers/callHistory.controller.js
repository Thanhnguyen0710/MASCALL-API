const CallHistory = require('../models/CallHistory');
const Contact = require('../models/Contact');

module.exports.addCallHistory = async (req, res) => {
  const callHistory = req.body;
  try {
    const newCallHistory = new CallHistory(callHistory);
    await newCallHistory.save();
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: newCallHistory
    })
  } catch (error) {
    res.status(404).send("Bad request");
  }
}

module.exports.getAllCallHistory = async (req, res) => {
  const query = req.query.email;
  try {
    const callHistory = await CallHistory.find({"$or": [{from: query}, {to: query}]}).sort({createdDate: -1});
    for (let i = 0; i < callHistory.length ; i++) {
      let emailMe = query;
      let email = '';
      if (callHistory[i].from === emailMe) {
        email = callHistory[i].to
      } else {
        email = callHistory[i].from
      }
      const contact = await Contact.findOne({emailMe: emailMe, email: email});
      callHistory[i].user = contact;
    }
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: callHistory
    })
  } catch (error) {
    res.status(404).send("Bad request");
  }
}

module.exports.getCallHistory = async (req, res) => {
  const query = req.query.phoneOrEmail;
  const email = req.params.email;
  try {
    const callHistory = await CallHistory.find({from: {"$in": [query, email]}, to: {"$in": [query, email]}}).sort({createdDate: -1});
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: callHistory
    })
  } catch (error) {
    res.status(404).send("Bad request");
  }
}

module.exports.deleteAllCallHistory = async (req, res) => {
  const query = req.query.email;
  try {
    await CallHistory.deleteMany({"$or": [{from: query}, {to: query}]})
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: null
    })
  } catch (error) {
    res.status(404).send("Bad request");
  }
}

module.exports.deleteAContactCallHistory = async (req, res) => {
  const query = req.query.phoneOrEmail;
  const email = req.params.email;
  try {
    await CallHistory.deleteMany({from: {"$in": [query, email]}, to: {"$in": [query, email]}})
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: null
    })
  } catch (error) {
    res.status(404).send("Bad request");
  }
}

module.exports.deleteACallHistory = async (req, res) => {
  const id = req.params.id;
  try {
    await CallHistory.deleteMany({_id: id})
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: null
    })
  } catch (error) {
    res.status(404).send("Bad request");
  }
}