const multer = require('multer')

const storage = multer.memoryStorage()

const fileFilterforStudentPics = (req,file,cb)=>{
    const allowedType = ['image/jpeg','image/png','image/jpg','image/gif']
    if(allowedType.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error('Only image with allowed types can upload'),false)
    }
}

const fileFilterForAssessment = (req,file,cb)=>{
    const allowedType= ['application/pdf']
    if(allowedType.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error('only Pdf file will accepted for Assignment Uploading'))
    }
}
const uploadforAssessment=multer({
    storage:storage,
    fileFilter:fileFilterForAssessment
}).single('pdf')

const uploadforStudentPics=multer({
    storage:storage,
    fileFilter:fileFilterforStudentPics
}).single('image')


module.exports={uploadforStudentPics,uploadforAssessment}