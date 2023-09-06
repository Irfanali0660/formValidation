const { body, check } = require('express-validator');
let bcrypt = require("bcrypt");

let phoneValidation=(value)=>{
    const phoneNumberRegex = /^[0-9]{10}$/; 
  if (!phoneNumberRegex.test(value)) {
    throw new Error('Invalid phone number format');
  }
  return true;
}

module.exports={
    signupValidationCheck:[
        check('username').isLength({min:3})
        .withMessage('is invalid,atleast 3 charecter is required')
        .isLength({max:10})
        .withMessage('is invalid,maximum 10 charecter is allowed'),

        check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address')
        .trim(),

        check('phonenumber')
        .custom(phoneValidation),

        check('password')
        .isLength({max:8})
        .withMessage('is invalid,atleast 8 chars required')
        .trim()
        .custom((value,{req})=>{
            if(value == req.body.repassword){
                return Promise.resolve()
            }else{
                return Promise.reject("didn't match, please recheck the password")
            }
        })
    ],
    hashpassword:(password)=>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;    
    }
    
    
}