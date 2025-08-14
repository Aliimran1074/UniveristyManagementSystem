    const mongoose=require('mongoose')

    const timeSlotSchema=new mongoose.Schema({
        day:{
            type:String,
            enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            required:true
        },
        startTime:{
            type:time,
            required:true
        },
        endTime:{
            type:String,
            required:true
        }
    },{timestamps:true})
    const timeSlotModel= mongoose.model('timeSlotModel',timeSlotSchema)

    module.exports= timeSlotModel