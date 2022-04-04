const {API_KEY_SID, API_KEY_SECRET} = require('../config/stringee-config');

const apiKeySid = API_KEY_SID;
const apiKeySecret = API_KEY_SECRET;

module.exports.getToken =  async (req, res) => {
  const userId = req.params.id;
  var now = Math.floor(Date.now() / 1000);
	var exp = now + 36000;

	var header = {cty: "stringee-api;v=1"};
	var payload = {
		jti: apiKeySid + "-" + now,
		iss: apiKeySid,
		exp: exp,
		userId: userId
	};

	var jwt = require('jsonwebtoken');
	var token = jwt.sign(payload, apiKeySecret, {algorithm: 'HS256', header: header})
  res.status(200).send({
    errorCode: '0',
    errorMessages: 'Success',
    data: token
  })
}