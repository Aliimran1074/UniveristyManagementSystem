const mongoose= require('mongoose')

const studentSchema= new mongoose.Schema({
    name:{
            type:String,
            required:true
    },
    studentId :{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,

    },
    password:{
        type:String,
        required:true
    },
    semesterNo:{
     type: Number,
     required:true   
    },
    department:{
        type:mongoose.Schema.ObjectId,
        ref:'Department',
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    cnicNo:
    {
        type:String,
        required:true
    },
    tickets:[{
        type:mongoose.Schema.ObjectId,
        ref:'Ticket',
    }],
    CpgaRecord:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Grade'
        }
    ],
    currentSemester:{
        type:Number,
        required:true
    },
    statusOfStudent:{
        type:String,
        enum:['studying','semester Freeze','degree completed','leave university','pending'],
        default:'studying'
    }
    
})

