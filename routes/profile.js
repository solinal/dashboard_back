var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profile');
const verifyToken = require('./validate-token');

router.post('/imagesrc', profileController.imgsrc);
router.post('/deleteimagesrc', profileController.deleteimgsrc);
router.post('/updatedata', profileController.guardarAjustes);

module.exports = router;