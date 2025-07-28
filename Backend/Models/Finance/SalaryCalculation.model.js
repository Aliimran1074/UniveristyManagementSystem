const mongoose= require('mongoose')

const salaryCalculation= new mongoose.Schema({
    staffId:{
            type:mongoose.Schema.ObjectId,
            ref:'staffmodel'
    },
    staffAttendence:[{
        type:mongoose.Schema.ObjectId,
        ref:'staffAttendence'
    }],
    MonthAndYear:{
        type:String
    },
    SalaryPaid:{
        type:String
    }
})
