const mongoose= require('mongoose')

const departmentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    instituteId:{
        type:mongoose.Schema.ObjectId,
        ref:'instituteModel',
        required:true
    }
    
})

const department = mongoose.model('departmentModel',departmentSchema)
module.exports=department