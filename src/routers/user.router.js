const express = require("express")
const userRouter = express.Router()
const controller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')

userRouter.post('/register', controller.register);
userRouter.post('/login', controller.login);
userRouter.put('/update',authMiddleware.isLogin, controller.updateUser);
userRouter.get('/search',authMiddleware.isLogin, controller.searchUser);
userRouter.put('/updatefcmtoken/:id', authMiddleware.isLogin, controller.updateFCMToken);

module.exports = userRouter;