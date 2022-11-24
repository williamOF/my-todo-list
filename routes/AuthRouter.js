const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('../controllers/AuthController');

AuthRouter.post('/registrar', AuthController.registrar);
AuthRouter.post('/login', AuthController.login);

module.exports = AuthRouter;