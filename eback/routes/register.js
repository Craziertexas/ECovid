var express = require('express');
var router = express.Router();

var registerController = require('../controller/register.controller');

router.post('/getPatients', registerController.getPatients);
router.post('/addPatient', registerController.addPatient);
router.post('/editPatient', registerController.editPatient);
router.post('/deletePatient', registerController.deletePatient);
router.post('/getPatient', registerController.getPatient);

module.exports = router;