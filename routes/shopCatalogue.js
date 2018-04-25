var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/shopCatalogController');
router.post('/', Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
router.post('/recievepkg',Controller.RecievePakg);
router.post('/Sale',Controller.makesale);
module.exports = router;


