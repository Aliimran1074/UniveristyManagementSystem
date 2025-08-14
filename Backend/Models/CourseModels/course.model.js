const mongoose=require('mongoose')

const CourseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:mongoose.Schema.ObjectId,
        ref:'departmentModel',
        required:true
    },
    deprtmentName:{
        type:String
    },
    ForSemester:{
        type:Number,
        enum:[1,2,3,4,5,6,7,8,9,10],
        required:true
    },
    code:{
        type:Number,
        required:true,
        unique:true
    },
    creditHours:{
        type:Number,
        enum:[1,2,3],
        required:true
    },
    instructorTeached:{
        type:mongoose.Schema.ObjectId
    }
},{timestamps:true})

const courseModel=mongoose.model('courseModel',CourseSchema)
module.exports=courseModel