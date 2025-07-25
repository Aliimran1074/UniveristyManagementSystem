const mongoose=require('mongoose')
const department = require('./deparment.model')

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
    ForSemester:{
        type:Number,
        required:true
    },
    code:{
        type:Number,
        required:true
    },
    creditHours:{
        type:Number,
        enum:[1,2,3],
        required:true
    }
},{timestamps:true})

const courseModel=mongoose.model('courseModel',CourseSchema)
module.exports=courseModel