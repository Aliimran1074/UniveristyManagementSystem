const mongoose=require('mongoose')
// const { required } = require('zod/mini')

const superAdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    personalEmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },

})
const superAdminModel = mongoose.model('superAdminModel',superAdminSchema)
module.exports=superAdminModel