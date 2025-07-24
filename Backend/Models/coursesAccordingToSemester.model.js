const mongoose = require('mongoose')

const courseAccToSemesterSchema = new mongoose.Schema({
    courseName: {
        type:mongoose.Schema.ObjectId,
        required:true
    },
    department: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
})