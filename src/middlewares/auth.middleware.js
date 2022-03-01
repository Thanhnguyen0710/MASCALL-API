const {verifyToken} = require('../services/auth')

module.exports.isLogin = async (req, res, next) => {
  try {
    const token = req.get('authorization').split(' ')[1];
    const data = await verifyToken(token);
    if (data) {
      next()
    }
  } catch {
    res.status(401).send("Bad request");
  }
}