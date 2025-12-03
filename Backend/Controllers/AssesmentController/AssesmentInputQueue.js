const assignmentTopicModel = require("../../Models/AssignmentInputModel/assignment.input.model")
const { assignmentDateCalculator } = require("./assignment.controller")


const checkAssignmentInput =async()=>{
    try {
        const getPendingAssignment = await assignmentTopicModel.find({status:'pending'})
        // console.log(getPendingAssignment)
       
       const pendingAssignemntCourse= getPendingAssignment.map((currentElement,currentIndex)=>{
                return [currentElement.course.toString(),currentElement]
       })

       const uniquePendingCourse = [
        ... new Map(pendingAssignemntCourse).values() //confused (dry run needed)
       ]

    //  running loop of every unique course and match date first and get only allowed courses
    const allowedCourse=[]
    
       for (const currentElement of uniquePendingCourse){
        const result = await assignmentDateCalculator(currentElement.course)
        // console.log(result)
        if(result.message==true){
            allowedCourse.push(currentElement)
        } 
       }

       console.log("Allowed Array", allowedCourse)
    //  now will push this array into reddis /or if array small will apply function directly
    
    }
     catch (error) {
    console.log('Error in Check Assignment Input ',error)       
    }
}

module.exports= {checkAssignmentInput}