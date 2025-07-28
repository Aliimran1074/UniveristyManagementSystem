const mongoose= require('mongoose')

const staffAttendence = new mongoose.Schema({
    staffId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    date:{
        type:Date,
        default:Date
    }
},{timestamps})