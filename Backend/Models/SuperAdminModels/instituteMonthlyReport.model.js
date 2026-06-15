const mongoose = require('mongoose')

// const instituteMonthlyReportSchema = new mongoose.Schema({
//     instituteId:{
//         type:mongoose.Schema.ObjectId,
//         required:true
//     },
//     instituteName :
//     {
//         type:String,
//         required:true
//     },
//     month:{
//         type:Number,
//         required:true,
//         min:1,
//         max:12
//     },
//     year:{
//         type:Number,
//         required:true
//     },
//     reportPdf:{
//         type:String,
//     }
// },{timestamps:true})
const instituteMonthlyReportSchema = new mongoose.Schema({
    instituteId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },

    instituteName:{
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

    aiUsage:{
        assignmentGeneratorUsed:{type:Number,default:0},
        quizGeneratorUsed:{type:Number,default:0},
        contentGeneratorUsed:{type:Number,default:0},
        assignmentCheckerUsed:{type:Number,default:0},
        quizCheckerUsed:{type:Number,default:0},
        totalAiRequests:{type:Number,default:0}
    },

    totalStudents:{
        type:Number,
        default:0
    },

    totalStaff:{
        type:Number,
        default:0
    },

    reportPdf:{
        type:String
    }

},{timestamps:true})

instituteMonthlyReportSchema.index(
    { instituteId: 1, month: 1, year: 1 },
    { unique: true }
)
const instituteMonthlyReportModel = mongoose.model('instituteMonthlyReportModel',instituteMonthlyReportSchema)

module.exports={instituteMonthlyReportModel}