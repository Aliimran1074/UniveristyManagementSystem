const mongoose= require('mongoose')

const monthlyRevenue= new mongoose.Schema({
    studentsFeeRecived:[{
      type:mongoose.Schema.ObjectId,
      ref:'voucherModel' 
    }],
    salaries:[
    {
        type:mongoose.Schema.ObjectId,
        ref:'salaryCalculation'
    }],
  utilityBills:{
        type:String,
  }  
})