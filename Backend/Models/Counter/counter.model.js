const mongoose= require('mongoose')

const counterSchema = new mongoose.Schema({
    customId:{
        type:String,
        default:'abc'
    },
    sequence:{
        type:Number,
        default:0
    }
})

const counter=mongoose.model('counter',counterSchema)
module.exports= counter