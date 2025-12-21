const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    scopeId:{                               //institute/Batch/Class Id
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'InstituteModel'
    },
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'subscriptionPlanModel'
    },
    scopeType:{
        type:String,
        enum:["Institute","Batch","Class"],
        required:true
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
    }

})

const subscriptionModel = mongoose.model('subscriptionModel',subscriptionSchema)

module.exports= subscriptionModel