const User = require('../models/User');

module.exports.register = async (req, res) => {
  const user = req.body;
  try {
    const oldUser = await User.findOne(user)
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
    const dataPhone = await User.find({phoneNumber: query[0] === '0' ? new RegExp(query.slice(1, query.length)) : new RegExp(query)});
    const dataEmail = await User.find({email: new RegExp(query.search)});
    const data = dataPhone.concat(dataEmail.filter(function (item) {
      return dataPhone.indexOf(item) < 0;
    }));
    res.send(data);
  } catch (error) {
    res.status(401).send("Bad request");
  }
}