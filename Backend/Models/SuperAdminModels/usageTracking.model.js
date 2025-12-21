

const mongoose = reuqire('mongoose')

const userTrackerSchema = new mongoose.Schema({
    scopeType:{
        type:String,
        enum:["INSTITUTE","BATCH","CLASS"],
        required:true
    },
    scopeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})