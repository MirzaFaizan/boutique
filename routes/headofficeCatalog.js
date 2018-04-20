var express = require('express');
var router = express.Router();
var headController= require('../Controller/headofficeCatalogueController');
/* GET users listing. */
router.post('/', headController.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
router.post('/AddEmp', headController.CreatenewEmp);
router.post('/ShowEmps', headController.fetchallemps);
router.post('/searchemp',headController.fetchoneemp);
router.post('/Deleteemp',headController.Deleteemp);
module.exports = router;