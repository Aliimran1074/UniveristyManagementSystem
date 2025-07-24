const mongoose=require('mongoose')
const department = require('./deparment.model')

const courseRegistrationSchema=new mongoose.Schema({
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'courseModel',
        required:true
    },
    department:{
        type:mongoose.Schema.ObjectId,
        ref:'departmentModel'
    },
    timeSlot:{
        type:mongoose.Schema.ObjectId,
        ref:'timeSlot',
        required:true
    }


})