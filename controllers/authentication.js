const {validationResult}=require('express-validator')
const {addUser}=require('../model/userModel')
const {hashpassword}=require('../helper/validation')

module.exports={
    signupValidation:(req,res,next)=>{
        let response = {
            message: "Authentication Failed, please try again!",
            status: 401,
            authorization: true,
            data: {},
          }
            try {
                let error=validationResult(req)
                console.log(error.isEmpty());
                if(error.isEmpty()){
                        addUser({
                            username:req.body.username,
                            email:req.body.email,
                            phonenumber: req.body.phonenumber,
                            password:hashpassword(req.body.password)
                        }).then(()=>{
                            response.error='Signup competed successfully'
                            response.status=200
                            res.status(200).json(response)
                        }).catch((error)=>{
                            response.authorization=false
                            console.log(error);
                            if(error.code===11000){
                                let exist = Object.values(error.keyValue)[0];
                                response.message = `${exist} is already exists, please try login with the email!`;
                            }
                            res.status(404).json(response)
                        })
                }else{
                    response.error=error.errors
                    response.authorization=false
                    res.status(404).json(response)
                }
            } catch (error) {
                response.authorization=false
                response.message='internal server error'
                response.status=500
                res.status(500).json(response)
            }
    }
}