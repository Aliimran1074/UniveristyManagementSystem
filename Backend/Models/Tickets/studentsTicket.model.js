const mongoose= require('mongoose')

const studentTicketSchema= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'studentModel'
    },
    date:{
        type:Date,
        required:true
    }
},{timestamps:true})