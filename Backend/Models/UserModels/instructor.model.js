const mongoose= require('mongoose')

const instructorSchema = new mongoose.Schema({
    personalData:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    coursesTeached:[
        {
            type:mongoose.Schema.ObjectId,
            required:true       
        }
    ],
    timeTable:{
        type:mongoose.Schema.ObjectId
    },
    freeDay:{
        type:String,

    }
})