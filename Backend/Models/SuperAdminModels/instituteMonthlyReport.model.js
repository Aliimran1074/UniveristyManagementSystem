const mongoose = require('mongoose')

const instituteMonthlyReportSchema = new mongoose.Schema({
    instituteId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    instituteName :
    {
        type:String,
        required:true
    },
    month:{
        type:Number,
        required:true,
        min:1,
        max:12
    },
    year:{
        type:Number,
        required:true
    },
    reportPdf:{
        type:String,
    
    }

},{timestamps:true})

instituteMonthlyReportSchema.index(
    { instituteId: 1, month: 1, year: 1 },
    { unique: true }
)
const instituteMonthlyReportModel = mongoose.model('instituteMonthlyReportModel',instituteMonthlyReportSchema)

module.exports={instituteMonthlyReportModel}