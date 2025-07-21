const mongoose= require('mongoose')

const AttendenceSchema= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'StudentSchema',
        required:true
    },
    CourseId:{
        type:mongoose.Schema.ObjectId,
        ref:"CourseSchema",
        required:true
    },
    departmentId:{
        type:mongoose.Schema.ObjectId,
        ref:'DepartmentSchema',
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['present','absent','leave'],
        required:true
    }
},{timestamps:true})

const attendenceModel=mongoose.model('AttendenceModel',AttendenceSchema)
module.exports=attendenceModel