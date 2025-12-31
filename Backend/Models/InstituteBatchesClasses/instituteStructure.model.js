const mongoose = require('mongoose')

const instituteStructureSchema= new mongoose.Schema({
    instituteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'instituteModel',
        required:true
    },
    noOfSemester :{
        type:Number
    },
    noOfClasses:{
        type:Number
    },
    noOfSections:{
        type:Number
  } ,
  noOfDepartments:{
        type:Number
  } 
},{timestamps:true})

const instituteStructureModel = mongoose.model('instituteStructureModel',instituteStructureSchema)

module.exports=instituteStructureModel