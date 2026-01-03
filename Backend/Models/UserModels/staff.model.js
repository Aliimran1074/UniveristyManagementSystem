const mongoose= require('mongoose')

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
    instituteId:{
        type:mongoose.Schema.ObjectId,
        ref:'instituteModel',
        required:true
    },
    department:{
        type:mongoose.Schema.ObjectId,
        ref:'department'

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
    imageUrl:{
        type:String
    }

})

const staffModel = mongoose.model('staffModel',staffSchema)
module.exports= staffModel