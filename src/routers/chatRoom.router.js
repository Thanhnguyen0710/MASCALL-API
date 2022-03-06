const express = require('express');
const chatRoomRouter = express.Router();
const controller = require('../controllers/chatRoom.controller');
const authMiddleware = require('../middlewares/auth.middleware');

chatRoomRouter.post('/', authMiddleware.isLogin, controller.addRoom);
chatRoomRouter.get('/',authMiddleware.isLogin, controller.getRoom);
chatRoomRouter.delete('/:id',authMiddleware.isLogin, controller.deleteRoom);

module.exports = chatRoomRouter;