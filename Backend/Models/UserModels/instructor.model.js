const mongoose= require('mongoose')

const instructorSchema = new mongoose.Schema({
    personalData:{
        type:mongoose.Schema.ObjectId,
        
    },
    coursesTeached:[
        {
            type:mongoose.Schema.ObjectId,
             
        }
    ],
    timeTable:{
        type:mongoose.Schema.ObjectId
    },
    freeDay:{
        type:String,

    }
})