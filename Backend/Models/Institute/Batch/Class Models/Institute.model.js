const mongoose =require('mongoose')

const instituteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    scope:{
        type:String,
        enum:['Institute','Batch','Class'],
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true      
    },
    creditCardDetails:{
        type:String
    },
    createdAt:{
        type:Date
    }
},{timestamps:true})

// institute or subscription ko is tarhan link kiya hai jese hi institute create karenge or subscription plan select karenge foran institute model banega phr us id ko pick karke hum subscription bana denge payment ke bd

const instituteModel = mongoose.model('instituteModel',instituteSchema)

module.exports =instituteModel
