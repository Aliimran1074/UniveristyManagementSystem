const courseModel = require("../../Models/CourseModels/course.model")
const { courseEnrollmentModel } = require("../../Models/CourseModels/courseEnrollment.model")
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")
const studentRegistrationModel = require("../../Models/UserModels/studentRegistration.model")

const courseEnrollment = async(req,res)=>{
    try{
        const {courseId,studentId,subscriptionId}= req.body
        const checkSubscriptionDetails = await subscriptionModel.findById(subscriptionId)
        const instituteId = checkSubscriptionDetails.instituteId
        // const scopeOfInstitute= checkSubscriptionDetails.scopeType
        // sab se pehle check karna hai k jis course me enroll karna wo us institute ka hai bhi ya nhi or jo student register kar raha ho wo us institute ka hai ya nhi jis me yeh course parhaya jata hai 
        // const checkCourse = await courseModel.findById(courseId)
        // const courseInstitute= checkCourse.instituteId

        const courseDetails = await courseModel.findById(courseId)
        const courseInstituteId = courseDetails.instituteId
        console.log(courseInstituteId)
        if((!instituteId.toString() == courseInstituteId.toString())){
            console.log("Course and Institute  Mismatch")
            return res.status(200).json({message:" ID Mismatch"})
        }
        // check student is of same institute or not
        const checkStudentInstitute = await studentRegistrationModel.findById(studentId)
        const instituteIdViaStudentId= checkStudentInstitute.instituteId
        console.log("Institute Id according to Student Id :",instituteIdViaStudentId)
        if(!(instituteId.toString() == instituteIdViaStudentId.toString())){
            console.log("Student and Institute  Mismatch")
            return res.status(200).json({message:" ID Mismatch"})
        }
        // if(!instituteId.toString() == courseInstitute.toString()){
        //     console.log("Institute Id and Institute Affliated to Course Mismatch")
        //     return res.status(200).json({message:" ID Mismatch"})
        // }
        // if(scopeOfInstitute=='individual'){
            // const checkAlreadyCourseRegistrationByStudeb
            // yahan yeh bhi possible hai k student us coaching me bhi parhta ho jo yeh software use karti hai or us school me bhi to hum yahan student k lehaz se to course enrollment ka kaam nhi kar sakte
            // student can register in only one course
        // }

        const isStudentAlreadyRegisterInSameCourse = await courseEnrollmentModel.find({studentId:studentId,courseId:courseId}).countDocuments()

        if(isStudentAlreadyRegisterInSameCourse){
            console.log("Student Already Register in a Course",isStudentAlreadyRegisterInSameCourse)
            return res.status(400).json({message:"Student Already Register in a Course",isStudentAlreadyRegisterInSameCourse})
        }
        // time table clash work remaining

        const enrollStudentInACourse= await courseEnrollmentModel.create({studentId:studentId,courseId:courseId,instituteId:instituteId})
        if(!enrollStudentInACourse){
            console.log("Issue to Enroll Student In a Course")
            return res.status(404).json({message:"Issue in Enroll Student in a Particular Course"})
        }
        console.log("Course Registration Successfully",enrollStudentInACourse)
        return res.status(200).json({message:"Student Enroll in a Course Successfully",enrollStudentInACourse})
    }
    catch(error){
        console.log("Error in Function",error)
        res.status(404).json({message:"Error in Function",error})
    }
}


module.exports = {courseEnrollment}