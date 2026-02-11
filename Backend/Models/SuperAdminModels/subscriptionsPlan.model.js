const mongoose = require('mongoose')

const subscriptionPlansSchema = new mongoose.Schema({
    subscriptionName:{
        type:String,
        required:true
    },
        
        description:{
            type:String,
            required:true
        },
        type:{
            type:String,
            enum:['individual','batch','institute'],
            required:'true'
        },
        maxClasses:{
            type:Number,
            default:1
        },
        maxDepartments:{
            type:Number,
            default:0
        },
        aiFeatures:{
            enabled:{type:Boolean,default:false},
            features:[{type:String}],
            limits:{type:Map , of:Number}
        },
        manualFeatures:[{type:String}],
        price:{type:Number,default:0},
        durationDays:{type:Number,default:356}
})


const subscriptionPlanModel = mongoose.model('subscriptionPlanModel',subscriptionPlansSchema)

module.exports= {subscriptionPlanModel}


// const subscriptionSchema = new mongoose.Schema({
//     scopeId:{                               //institute/Batch/Class Id
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'InstituteModel'
//     },
//     planId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'subscriptionPlanModel'
//     },
//     scopeType:{
//         type:String,
//         enum:["Institute","Batch","Class"],
//         required:true
//         },
//     startDate:{
//         type:Date,
//         required:true
//     },
//     endDate:{
//         type:Date,
//         required:true
//     },
//     status:{
//         type:String,
//         enum:['Active','Expired','Cancelled'],
//         default:'Active'
//     }

// })

// const subscriptionModel = mongoose.model('subscriptionModel',subscriptionSchema)

// module.exports= subscriptionModel
