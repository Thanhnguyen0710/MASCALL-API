const express = require('express');
const contactRouter = express.Router();
const controller = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth.middleware');

contactRouter.post('/', authMiddleware.isLogin, controller.addContact);
contactRouter.get('/', authMiddleware.isLogin, controller.getContact);
contactRouter.put('/', authMiddleware.isLogin, controller.updateContact)

module.exports = contactRouter;