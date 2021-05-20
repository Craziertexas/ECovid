var express = require('express');
var router = express.Router();

var adminController = require('../controller/admin.controller')

router.get('/getUsers', adminController.getUsers);
router.get('/addUser', adminController.addUser);

module.exports = router;