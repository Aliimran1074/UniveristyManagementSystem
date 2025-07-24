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
     enum:[1,2,3,4,5,6,7,8,9,10],
     default:1,
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

    statusOfStudent:{
        type:String,
        enum:['studying','semester Freeze','degree completed','leave university','pending'],
        default:'studying'
    }
    
})

