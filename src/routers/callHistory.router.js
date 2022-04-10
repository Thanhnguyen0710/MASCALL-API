const express = require('express');
const callHistoryRouter = express.Router();
const controller = require('../controllers/callHistory.controller');
const authMiddleware = require('../middlewares/auth.middleware');

callHistoryRouter.post('/', authMiddleware.isLogin, controller.addCallHistory);
callHistoryRouter.get('/', authMiddleware.isLogin, controller.getAllCallHistory);
callHistoryRouter.get('/:email', authMiddleware.isLogin, controller.getCallHistory);
callHistoryRouter.delete('/', authMiddleware.isLogin, controller.deleteAllCallHistory);
callHistoryRouter.delete('/:id', authMiddleware.isLogin, controller.deleteACallHistory);
callHistoryRouter.put('/:email', authMiddleware.isLogin, controller.deleteAContactCallHistory);

module.exports = callHistoryRouter;