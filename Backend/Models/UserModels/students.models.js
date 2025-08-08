const mongoose= require('mongoose')

const studentSchema= new mongoose.Schema({
    name:{
            type:String,
            required:true
    },
    studentId :{
        type:String,
       
    },
    personalEmail:{
        type:String,
        required:true

    },
    universityEmail:{
        type:String,

    },
    password:{
        type:String,
    },

    semesterNo:{
     type: Number,
     enum:[1,2,3,4,5,6,7,8,9,10],
     default:1,
     
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
    },
    imageUrl:{
        type:String,
        required:true
    },
    qrCode:{
        type:String,
        
    }
    // counter:{
    //     type:Number,
    //     required:true      
    // }
    
})

const studentModel = mongoose.model('studentModel',studentSchema)
module.exports= studentModel