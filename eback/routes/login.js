var express = require('express');
var router = express.Router();

var loginController = require('../controller/login.controller');

router.post('/checkUser', loginController.checkUser);

module.exports = router;