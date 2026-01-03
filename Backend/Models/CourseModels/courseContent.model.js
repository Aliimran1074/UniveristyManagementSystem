const mongoose= require('mongoose')

const courseContentSchema = new mongoose.Schema({
    contentTitle :{
        type:String,
        required:true
    },
    courseId:
    {
        type:mongoose.Schema.ObjectId,
        ref:'courseModel',
        required:true
    },
    instituteId:{
        type:mongoose.Schema.ObjectId,
        ref:'institute',
        required:true
    }  
},{timestamps:true})


const courseContentModel = mongoose.model('courseContentModel',courseContentSchema)

module.exports={courseContentModel}