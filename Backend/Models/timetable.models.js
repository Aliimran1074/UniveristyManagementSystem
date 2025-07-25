const mongoose= require('mongoose')
const department = require('./deparment.model')

const timeTableSchema= new mongoose.Schema({
    department:{
        type:mongoose.Schema.ObjectId,
        ref:'departmentModel'
    },
    courses:[{
        type:mongoose.Schema.ObjectId,
        ref:'courseModel'
    }],
    instructors:[{
        type:mongoose.Schema.ObjectId,
        ref:'instructorModel'
    }],
    timeSlots:[{
        type:mongoose.Schema.ObjectId,
        ref:'timeSlotModel'
    }]

},{timestamps:true})
