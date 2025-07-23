const mongoose= require('mongoose')

const resultSchema= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId
    }
})