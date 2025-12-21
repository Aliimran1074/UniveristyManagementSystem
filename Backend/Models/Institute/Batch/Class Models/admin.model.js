const mongoose=  require('mongoose')

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    instituteId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'instituteModel'
    },
    contactNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
},{timestamps:true})


const adminModel=mongoose.model('adminModel',adminSchema)
module.exports= adminModel
