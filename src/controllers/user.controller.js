const User = require('../models/User');
const Contact = require('../models/Contact');

module.exports.register = async (req, res) => {
  const user = req.body;
  try {
    const oldUser = await User.findOne({email: user.email})
    if (oldUser) {
      res.status(200).send({
        errorCode: '0',
        errorMessages: 'Success',
        data: oldUser
      })
    } else {
      const newUser = new User(user);
      await newUser.save();
      res.status(200).send({
        errorCode: '0',
        errorMessages: 'Success',
        data: newUser
      })
    }
  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.login = async (req, res) => {
  const email = req.body;
  try {
    const user = await User.findOne(email);
    if (user) {
      res.status(200).send({
        errorCode: '0',
        errorMessages: 'Success',
        data: user
      })
    } else {
      res.status(401).send("Bad request");
    }
    
  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.updateUser = async (req, res) => {
  const user = req.body;
  try {
    await User.updateOne({_id: user._id}, user);
    await Contact.updateMany(
      {email: user.email}, 
      {phoneNumber: user.phoneNumber, photoURL: user.photoURL, displayName: user.displayName}
    );
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: user
    })
  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.searchUser = async (req, res) => {
  const query = req.query.search;
  try {
    const dataPhone = await User.find({phoneNumber: new RegExp(query)});
    const dataEmail = await User.find({email: new RegExp(query)});
    const data = dataPhone.concat(dataEmail.filter(function (item) {
      return dataPhone.indexOf(item) < 0;
    }));
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: data
    })
  } catch (error) {
    res.status(401).send("Bad request");
  }
}