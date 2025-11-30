const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    assignmentFile :{
        type:String,
        // type:file
        // required:true
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'courseModel',
        required:true
    },
   createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:'staffModel',
    required:true
   },
   uploadedBy:[{
    type:mongoose.Schema.ObjectId,
    ref:'studentModel'
   }
   ],
   generatedDate:{
    type:Date,
    // required:true
    default:function (){
      const date=  new Date()
      date.setHours(0,0,0,0)
      return date
   }},
   duration:{
    type:Number,
    required:true
   },
   endDate:{
    type:Date,
    default:function(){
        const date=new Date()
        date.setDate(date.getDate()+this.duration)
        date.setHours(23,59,59,999)
        return date
    }
   },
   daysLeft:{
    type:Number,
    default:function(){
        // console.log("Generated Date",this.generatedDate)
        if (!this.generatedDate || !this.endDate) return 0

   const diff=  (this.endDate-this.generatedDate)/86400000
   return Math.ceil(diff)

    }
   }

})

const assignmentModel = mongoose.model('assignmentModel',assignmentSchema)
module.exports = assignmentModel