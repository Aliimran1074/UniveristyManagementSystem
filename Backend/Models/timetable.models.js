const mongoose= require('mongoose')
const department = require('./deparment.model')

const timeTableSchema= new mongoose.Schema({
    department:{
        type:mongoose.Schema.ObjectId,
        ref:'departmentModel'
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'courseModel'
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:'instructorModel'
    },
    timeSlot:{
        type:mongoose.Schema.ObjectId,
        ref:'timeSlotModel'
    }

},{timestamps:true})
