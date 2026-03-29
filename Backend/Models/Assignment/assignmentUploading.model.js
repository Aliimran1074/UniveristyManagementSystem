const mongoose = require('mongoose')

const assignmentUploadingSchema = new mongoose.Schema(
    {
        assigmnetId:{
            type:mongoose.Schema.ObjectId,
            ref:"assignmentModel",
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

const assignmentUploadingModel = mongoose.model('assignmentUploadingModel',assignmentUploadingSchema)
module.exports = assignmentUploadingModel