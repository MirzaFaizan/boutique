var express = require('express');
var router = express.Router();
var loginController= require('../Controller/adminLoginController')
/* GET users listing. */
router.post('/', loginController.loginandGetToken);
var token= require('../Controller/adminLoginController');
console.log(token.token);
module.exports = router;
