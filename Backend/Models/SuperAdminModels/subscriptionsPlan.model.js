const mongoose= require('mongoose')

const subscriptionPlanSchema= new mongoose.Schema({
    subscriptionName:{
        type:String,
        required:true
    },
    allowedScopes :{
        type:[String],
        enum:["Institute",'Batch','Class'],
        requried:true
    },
    features:{
       lms:{
        type:Boolean,
        default:false
       },
       assignments:{
        type:Boolean,
        default:false
       },
       quizzes:{
        type:Boolean,
        default:false
       },
       agents:{
        type:Boolean,
        default:false
       }
    },
    limits:{
        maxAssignmnetLimit:Number,
        maxQuizzesLimit:Number,
        maxBatches : Number,         //{null = unlimited
        maxClasses:Number                   //} 
    },
    price:Number,
    durationInDays:Number,

    isActive:{
        type:Boolean,
        default:true
    }
})


const subscriptionPlanModel= mongoose.model('subscriptionModel',subscriptionPlanSchema)

module.exports= subscriptionPlanModel