const express = require("express")
const userRouter = express.Router()
const controller = require('../controllers/user.controller');

userRouter.post('/register', controller.register);
userRouter.post('/login', controller.login);

module.exports = userRouter;