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
            type:Number,
            default:0
        },
        marksAssigned:{
            type:Boolean,
            default:false
        },
        maxMarks:{
            type:Number,
            default:5
        }
    }
)

const assignmentUploadingModel = mongoose.model('assignmentUploadingModel',assignmentUploadingSchema)
module.exports = assignmentUploadingModel