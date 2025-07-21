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
    }
},{timestamps:true})

const courseModel=mongoose.model('courseModel',CourseSchema)
module.exports=courseModel