const mongoose= require('mongoose')

const individualStudentRecord= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'studentModel'
    },
    SemestersCgpaRecord:[{
        type:String,
       
    }],
    marksAgainstCourses:[{
        type:mongoose.Schema.ObjectId,
        ref:'coursesModel'
    }]
})