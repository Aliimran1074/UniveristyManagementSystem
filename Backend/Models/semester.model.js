const mongoose= require('mongoose')

const StudentSemesterSchema = new mongoose.Schema({
  semester:{
    type:String,
    required:true
  },
  studentId:{
    type:mongoose.Schema.ObjectId,
    ref:'StudentModel',
    required:true
  },
  courses:[{
    type:mongoose.Schema.ObjectId,
    ref:'coursesModel'  
  }]


})