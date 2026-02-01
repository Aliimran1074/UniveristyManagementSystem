const courseModel= require('../../Models/CourseModels/course.model')
const institute = require('../../Models/InstituteBatchesClasses/Institute.model')
const {imageKitConfig,fileIdByName}= require('../../ImageKit.IO Setup/setup')
const createManualCourseContent = async(req,res)=>{
    try {
        const file = req.file 
        if(!req.file){
            console.log("File not Found in Manual Assignment Creation")
            return res.status(400).json({message:"File Not Found in Manual Assignment"})
        }
        const {contentTitle,courseId,instituteId}= req.body
        console.log(req.file)
        const fileName = req.file.originalname
        console.log('File Name : ',fileName)

        console.log(contentTitle,courseId,instituteId)
        return res.status(200).json({message:"This is a File Name",fileName})
        // const fileName = `${Date.now()}_${createStudentEmail}`
        
        //             const imageKitResponse= await imageKitConfig.upload({
        //                 file:req.file.buffer,
        //                 fileName:fileName
        //             })
        //             // console.log("Image kit response",imageKitResponse)
        //             const imageKitUrl= imageKitResponse.url
        //             console.log('Image kit url ', imageKitResponse.url)
        //             if(imageKitUrl.length>0 || imageKitUrl){
        //                 createStudent.imageUrl=imageKitUrl
        //                 await createStudent.save()
        //             }
        //             return res.status(200).json({ message: 'Student Created Successfully', createStudent })
        // file uploading process
        // const createManualCourseContent = 
    } catch (error) {
        console.log('Error in Manual Content Creation Function')
        return res.status(404).json({message:"Error in Manual Content Creatiion Function"})
    }
}

module.exports = {createManualCourseContent}