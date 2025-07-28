const mongoose=require('mongoose')

const feeSchema= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'studentModel'    
    },
    currentlyRegisterCourse:{
        type:mongoose.Schema.ObjectId
    },
    totalCreditHours:{
        type:Number    
    },
    perCreditHourFee:{
        type:BigInt,

    },
    totalFee:{
        type:BigInt
    },
    paidFee:{
        type:Number,
    },
    remainingFee:{
     type:Number   
    }

})