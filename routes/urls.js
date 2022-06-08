const express = require('express');
const db = require('./../db/mariadb');
const HealthController = require('../controllers/health.controller');
const EquityMasterController = require('../controllers/equity-master.controller');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

// register controllers
const healthController = new HealthController();
healthController.register(router);

const equityMasterController = new EquityMasterController();
equityMasterController.register(router);

const authController = new AuthController();
authController.auth(router);

module.exports = router;
