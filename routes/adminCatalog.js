var express = require('express');
var router = express.Router();
var app=express();
var catalogueController= require('../Controller/adminCatalogueController');
router.get('/a',function(req,res){
    res.send('DashBoard Comes Here');
})
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */

router.post('/',function(req,res){
    res.send('DashBoard Comes Here');
})

router.post('/addArticle',catalogueController.CreatenewArticle);
router.post('/DeleteArticle/:id',catalogueController.DeleteArticle);


module.exports = router;

