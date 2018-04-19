var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/adminCatalogueController');
router.post('/',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */

router.post('/addArticle',Controller.CreatenewArticle);
router.post('/DeleteArticle/:id',Controller.DeleteArticle);


module.exports = router;

