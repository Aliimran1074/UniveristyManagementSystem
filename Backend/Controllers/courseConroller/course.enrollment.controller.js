const courseModel = require("../../Models/CourseModels/course.model")

const courseEnrollment = async(req,res)=>{
    try{
        const {instituteId,courseId,studentId}= req.body

        // sab se pehle check karna hai k jis course me enroll karna wo us institute ka hai bhi ya nhi or jo student register kar raha ho wo us institute ka hai ya nhi jis me yeh course parhaya jata hai 

        const courseDetails = await courseModel.findById(courseId)
        const courseInstituteId = courseDetails.instituteId
        if(instituteId.toString == courseInstituteId.toString){
            console.log("Course and Institute Match")
            return res.status(200).json({message:"Mismatched"})
        }
    }
    catch(error){
        console.log("Error in Function",error)
        res.status(404).json({message:"Error in Function",error})
    }
}


module.exports = {courseEnrollment}