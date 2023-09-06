const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

let userdata = (module.exports = mongoose.model("users", userSchema));

module.exports.addUser = function (data) {
    let useData=new userdata(data)
    return useData.save()
};