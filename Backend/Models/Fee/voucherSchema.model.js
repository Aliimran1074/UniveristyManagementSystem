const mongoose= require('mongoose')

const voucherSchema= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'studentModel'
    },
    amount:
    {
        type:mongoose.Schema.ObjectId,
        ref:'feeModel'
    }

})