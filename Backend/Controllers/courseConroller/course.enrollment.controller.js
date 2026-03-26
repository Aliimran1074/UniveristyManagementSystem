const courseModel = require("../../Models/CourseModels/course.model")
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")
const studentRegistrationModel = require("../../Models/UserModels/studentRegistration.model")

const courseEnrollment = async(req,res)=>{
    try{
        const {courseId,studentId,subscriptionId}= req.body
        const checkSubscriptionDetails = await subscriptionModel.findById(subscriptionId)
        const instituteId = checkSubscriptionDetails.instituteId
        const scopeOfInstitute= checkSubscriptionDetails.scopeType
        // sab se pehle check karna hai k jis course me enroll karna wo us institute ka hai bhi ya nhi or jo student register kar raha ho wo us institute ka hai ya nhi jis me yeh course parhaya jata hai 

        const courseDetails = await courseModel.findById(courseId)
        const courseInstituteId = courseDetails.instituteId
        console.log(courseInstituteId)
        if(!instituteId.toString() == courseInstituteId.toString()){
            console.log("Course and Institute  Mismatch")
            return res.status(200).json({message:" ID Mismatch"})
        }
        // check student is of same institute or not
        const checkStudentInstitute = await studentRegistrationModel.findById(studentId)
        const instituteIdViaStudentId= checkStudentInstitute.instituteId

        if(!instituteId.toString() == instituteIdViaStudentId.toString()){
            console.log("Student and Institute  Mismatch")
            return res.status(200).json({message:" ID Mismatch"})
        }
        if(scopeOfInstitute=='individual'){
            // student can register in only one course
        }

        // check subscription also if student is of Basic Subscription he can only enroll in one Course
        console.log("Mismatched")
        return res.status(400).json({message:"Mismatched"})
    }
    catch(error){
        console.log("Error in Function",error)
        res.status(404).json({message:"Error in Function",error})
    }
}


module.exports = {courseEnrollment}