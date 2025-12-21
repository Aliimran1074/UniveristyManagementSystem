const mongoose= require('mongoose')


const superAdminUsersSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    superAdminCount:{
        type:Number,            //will use to limit upto 3

    }
})


const superAdminUsersModel = mongoose.model('superAdminUsersModel',superAdminUsersSchema)

module.exports= superAdminUsersModel