const mongoose= require('mongoose')

const courseContentSchema = new mongoose.Schema({
    
    contentTitle :{
        type:String,
        required:true},
    
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
    } ,
    
    fileUrl :
    {type:String,}
},{timestamps:true})


const courseContentModel = mongoose.model('courseContentModel',courseContentSchema)

module.exports={courseContentModel}