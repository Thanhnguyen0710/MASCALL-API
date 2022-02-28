const User = require('../models/User');

module.exports.register = async (req, res) => {
  const user = req.body;
  try {
    const oldUser = await User.findOne(user)
    if (oldUser) {
      res.status(401).send("User Exist");
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
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: user
    })
  } catch (error) {
    res.status(401).send("Bad request");
  }
}