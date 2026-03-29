const assignmentModel = require("../../Models/Assignment/assignment.model")
const { courseEnrollmentModel } = require("../../Models/CourseModels/courseEnrollment.model")
const studentRegistrationModel = require("../../Models/UserModels/studentRegistration.model")

const assignmentUploading= async(req,res)=>{
    try {
        
        // if(!req.file){
        // console.log("File Not Found")
        // return res.status(400).json({message:"File Not Found"})
        // }
        const {assignmentId,studentId}= req.body
        const getAssignmentDetails = await assignmentModel.findById(assignmentId)
        
        if(!getAssignmentDetails){
            console.log("No Assignment Available With This ID")
            return res.status(400).json({message:"No Assignment Available With This ID"})
        }

        const getCourseIdViaAssignment= getAssignmentDetails.course
        const getCourseEnrollmentDetails = await courseEnrollmentModel.find({studentId:studentId,courseId:getCourseIdViaAssignment})

        if(!getCourseEnrollmentDetails){
            console.log("Sorry Only Enroll Student Can Upload Assignment")
            return res.status(400).json({message:"Sorry Only Enroll Student Can Upload Assignment"})
        }
        
        // ids match karke upload karna hai bs
        
        
        // const instituteDetailsViaAssignment = await assignmentModel.findById(assignmentId)
        // const instituteDetailsViaStudent = await studentRegistrationModel.findById(studentId)
        
        // const instituteIdViaAssignment = instituteDetailsViaAssignment.instituteId
        // const instituteIdViaStudent= instituteDetailsViaStudent.instituteId
        

        
        // if((instituteIdViaAssignment.toString())!== (instituteIdViaStudent.toString())){
        //     console.log("Only Student of Same Institute Can Upload Assignment")
        // } 

        // console.log("Institute Details Via Assignment",instituteDetailsViaAssignment)
        // console.log("Institute Details Via Student",instituteDetailsViaStudent)

        return res.status(200).json({message:"Thank you"})
        // const fileName = `${courseName}_${Date.now()}`
        
        //             const imageKitResponse= await imageKitConfig.upload({
        //                 file:req.file.buffer,
        //                 fileName:fileName
        //             })
        //             // console.log("Image kit response",imageKitResponse)
        //             const imageKitUrl= imageKitResponse.url
        //             console.log('Image kit url ', imageKitResponse.url)
        //             if(imageKitUrl.length>0 || imageKitUrl){
        //                 createManualAssignment.assignmentFile=imageKitUrl
        //                 await createManualAssignment.save()
        //             }
       
        // return res.status(200).json({message:"Assignment Created Successfully",createManualAssignment})

    } catch (error) {
        console.log("Error in Assignment Uploading Function",error)
        return res.status(404).json({message:"Error in Assignment Uploading Function",error})
    }
}


module.exports = {assignmentUploading}


