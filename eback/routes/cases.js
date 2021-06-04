var express = require('express');
var router  = express.Router();

var casesController = require('../controller/cases.controller');

router.post('/showCase', casesController.showCase);
router.post('/addStatus', casesController.addStatus);

module.exports = router;
