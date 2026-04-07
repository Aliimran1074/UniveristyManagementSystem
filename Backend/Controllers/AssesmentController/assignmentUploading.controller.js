const assignmentModel = require("../../Models/Assignment/assignment.model")
const assignmentUploadingModel = require("../../Models/Assignment/assignmentUploading.model")
const { courseEnrollmentModel } = require("../../Models/CourseModels/courseEnrollment.model")
const studentRegistrationModel = require("../../Models/UserModels/studentRegistration.model")


// is function ko run karke test karna hai
const assignmentUploading= async(req,res)=>{
    try {
        
        if(!req.file){
        console.log("File Not Found")
        return res.status(400).json({message:"File Not Found"})
        }
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
        
        // check student already upload assignment or not
        const checkAlreadyAssignmentUploading = await assignmentUploadingModel.find({assigmnetId:assignmentId,studentId:studentId})

        if(checkAlreadyAssignmentUploading){
            console.log("Student Already Uplaod Assignment")
            return res.status(400).json({message:"Student Already Uploaded Assignment"})
        }

        const uploadAssignment = await assignmentUploadingModel.create({assigmnetId:assignmentId,studentId:studentId})

        if(!uploadAssignment){
            console.log("Issue in Assignment Uploading")
            return res.status(400).json({message:"Issue in Assignment Uploading"})
        }
         const fileName = `${studentId}_${Date.now()}`
        
                    const imageKitResponse= await imageKitConfig.upload({
                        file:req.file.buffer,
                        fileName:fileName
                    })
                    // console.log("Image kit response",imageKitResponse)
                    const imageKitUrl= imageKitResponse.url
                    console.log('Image kit url ', imageKitResponse.url)
                    if(imageKitUrl.length>0 || imageKitUrl){
                        uploadAssignment.uploadedFile=imageKitUrl
                        await uploadAssignment.save()
                    }
       
        return res.status(200).json({message:"Assignment Uploaded Successfully",uploadAssignment})


        // // ids match karke upload karna hai bs
        
        
        // // const instituteDetailsViaAssignment = await assignmentModel.findById(assignmentId)
        // // const instituteDetailsViaStudent = await studentRegistrationModel.findById(studentId)
        
        // // const instituteIdViaAssignment = instituteDetailsViaAssignment.instituteId
        // // const instituteIdViaStudent= instituteDetailsViaStudent.instituteId
        

        
        // // if((instituteIdViaAssignment.toString())!== (instituteIdViaStudent.toString())){
        // //     console.log("Only Student of Same Institute Can Upload Assignment")
        // // } 

        // // console.log("Institute Details Via Assignment",instituteDetailsViaAssignment)
        // // console.log("Institute Details Via Student",instituteDetailsViaStudent)

        // return res.status(200).json({message:"Thank you"})
       

    } catch (error) {
        console.log("Error in Assignment Uploading Function",error)
        return res.status(404).json({message:"Error in Assignment Uploading Function",error})
    }
}


module.exports = {assignmentUploading}


