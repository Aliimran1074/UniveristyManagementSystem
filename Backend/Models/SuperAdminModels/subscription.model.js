const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    // scopeId:{                               //institute/Batch/Class Id
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'InstituteModel'
    // }
    instituteId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'InstituteModel'
    }
    ,
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'subscriptionPlanModel'
    },
    scopeType:{
        type:String,
        enum:["Institute","Batch","Class"],
        // required:true
        },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['Active','Expired','Cancelled'],
        default:'Active'
    },
     aiUsage:{
        assignmentGeneratorUsed:{ type:Number, default:0 },
        quizGeneratorUsed:{ type:Number, default:0 },
        examGeneratorUsed:{ type:Number, default:0 },
        contentGeneratorUsed:{ type:Number, default:0 },
        autoCheckerUsed:{ type:Number, default:0 },
        totalAiRequests:{ type:Number, default:0 }
    }

})

const subscriptionModel = mongoose.model('subscriptionModel',subscriptionSchema)

module.exports= subscriptionModel