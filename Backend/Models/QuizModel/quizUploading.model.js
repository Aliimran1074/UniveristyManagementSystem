const mongoose = require('mongoose')

const quizUploadingSchema = new mongoose.Schema(
    {
        quizId:{
            type:mongoose.Schema.ObjectId,
            ref:"quizModel",
            required:true
        },
        studentId:{
            type:mongoose.Schema.ObjectId,
            ref:"studentModel",
            required:true
        },
        uploadedFile:{
            type:String,
        },
        submittedAt:{
            type:Date,
            default:Date.now()
        },
        marks:{
            type:Number
        }
    }
)

const quizUploadingModel = mongoose.model('quizUploadingModel',quizUploadingSchema)
module.exports = quizUploadingModel