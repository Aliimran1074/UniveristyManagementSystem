const mongoose=require('mongoose')

const CourseSchema=new mongoose.Schema({
   
    instituteId:{
        type:mongoose.Schema.ObjectId,
        ref:'instituteModel',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    department:{
        type:mongoose.Schema.ObjectId,
        ref:'departmentModel',
        // sirf wo institute department id pass karenge jinho ne department create kare honge
    },
    deprtmentName:{
        type:String
    },
    
    ForSemester:{
        type:Number,
        enum:[1,2,3,4,5,6,7,8,9,10],
        // required:true
    },
    code:{
        type:Number,
        required:true,
        unique:true
    },
    creditHours:{
        type:Number,
        enum:[1,2,3],

    },
    instructorTeached:{
        type:mongoose.Schema.ObjectId,
        ref:"staffModel"
    }
},{timestamps:true})

const courseModel=mongoose.model('courseModel',CourseSchema)
module.exports=courseModel