const express = require('express');
const stringeeRouter = express.Router();
const controller = require('../controllers/stringee.controller');
const authMiddleware = require('../middlewares/auth.middleware');

stringeeRouter.get('/token/:id', authMiddleware.isLogin, controller.getToken);

module.exports = stringeeRouter;