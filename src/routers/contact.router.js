const express = require('express');
const contactRouter = express.Router();
const controller = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth.middleware');

contactRouter.post('/', authMiddleware.isLogin, controller.addContact);
contactRouter.get('/', authMiddleware.isLogin, controller.getContact);
contactRouter.get('/search', authMiddleware.isLogin, controller.searchContact);
contactRouter.put('/', authMiddleware.isLogin, controller.updateContact);
contactRouter.delete('/', authMiddleware.isLogin, controller.deleteContact);

module.exports = contactRouter;