const mongoose= require('mongoose')

const counterSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    sequence:{
        type:Number,
        default:0
    }
})

const counter=mongoose.model('counter',counterSchema)
module.exports= counter