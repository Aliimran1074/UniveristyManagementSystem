const mongoose= require('mongoose')

const resultSchema= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'StudentModel'
    },
    calculatedResult:{
        type:mongoose.Schema.ObjectId,
        ref:'studentResultModel'
    }
})