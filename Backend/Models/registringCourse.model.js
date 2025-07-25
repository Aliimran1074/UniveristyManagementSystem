const mongoose=require('mongoose')

const registredCourse= new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'studentModel',
        required:true
    },
    coursesRegister:[{
        type:mongoose.Schema.ObjectId,
        ref:'courseRegistrationModel',

    }]

})