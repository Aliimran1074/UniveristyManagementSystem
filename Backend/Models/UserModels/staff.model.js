const mongoose= require('mongoose')
const department = require('../Department/deparment.model')

const staffSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cnicNo:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    department:{
        type:String,
        enum:['None','FCIT','BBA','DFF','DPT','Administration','Security','SWs'],
        required:true

    },
    designation:{
        type:String,
        enum:['Instructor','HeadOfDepartment','Deen','Accountant','Clerk','Guard','SW','other'],
        required:true
    },
    QRCode:{
        type:String,
        
    }  ,
    salary:{
        type:String
    },
    profilePic:{
        type:String
    }

})

const staffModel = mongoose.model('staffModel',staffSchema)
module.exports= staffModel