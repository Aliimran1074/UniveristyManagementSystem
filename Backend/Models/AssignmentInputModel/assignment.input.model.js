const mongoose= require('mongoose')
// const { required } = require('zod/mini')

const assignmentInputSchema= new mongoose.Schema({
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:'staffModel',
        required:true
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'courseModel',
        required:true
    },
    assignmentTopic:{
     type:String,
     required:true
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','uploaded']
    }
   
},{timestamps:true})

const assignmentTopicModel= mongoose.model('assignmentTopicModel',assignmentInputSchema)

module.exports= assignmentTopicModel