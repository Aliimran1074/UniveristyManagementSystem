    const mongoose=require('mongoose')

    const timeSlotSchema=new mongoose.Schema({
        day:{
            type:String,
            enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            required:true
        },
        startTime:{
            hours:{
                type:Number,
                required:true
            },
            minutes:{
                type:Number,
                required:true
            },
            
        },
        endTime:{
             hours:{
                type:Number,
                required:true
            },
            minutes:{
                type:Number,
                required:true
            },
            
        }
    },{timestamps:true})
    const timeSlotModel= mongoose.model('timeSlotModel',timeSlotSchema)

    module.exports= timeSlotModel