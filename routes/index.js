var express = require('express');
var router = express.Router();
let {signupValidation}=require('../controllers/authentication')
let {signupValidationCheck}=require('../helper/validation')

/* GET home page. */
router.post('/signup',signupValidationCheck,signupValidation );

module.exports = router;
