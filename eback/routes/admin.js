var express = require('express');
var router = express.Router();

var adminController = require('../controller/admin.controller')

router.post('/getUsers', adminController.getUsers);
router.post('/getDetailUser', adminController.getDetailUser);
router.post('/addUser', adminController.addUser);
router.post('/removeUser', adminController.removeUser);
router.post('/editUser', adminController.editUser);

module.exports = router;