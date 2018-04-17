var express = require('express');
var router = express.Router();
var loginController= require('../Controller/headofficeCatalogueController');
/* GET users listing. */
router.post('/', loginController.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
router.post('/AddEmp', function(req,res){
    res.send('Add Employess Here!');
});
module.exports = router;