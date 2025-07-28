const mongoose=require('mongoose')

const registredCourseByIndividualStudent= new mongoose.Schema({
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