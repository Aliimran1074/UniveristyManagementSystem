const courseModel= require('../../Models/CourseModels/course.model')
const department = require('../../Models/Department/deparment.model')
const instituteModel = require('../../Models/InstituteBatchesClasses/Institute.model')
const subscriptionModel = require('../../Models/SuperAdminModels/subscription.model')
const subscriptionPlanModel =  require('../../Models/SuperAdminModels/subscriptionsPlan.model')
const staffModel = require('../../Models/UserModels/staff.model')
// wants to work little bit in it
const courseCreation= async (req,res)=>{
    try {
        const {name,departmentId,forSemester,forClass,creditHours,subscriptionId,instructorTeached}=req.body
        console.log("Course Name ",name)
        // first get institute Id and details of subscription via subscription Id
                    const checkSubscription = await subscriptionModel.findById(subscriptionId)
                    const subscriptionPlanId = checkSubscription.planId
                    const instituteId = checkSubscription.instituteId
                    console.log("Institute ID:",instituteId)
        // here we can check course with institute Id , if one course in a institute stored with a name so not allowed to create course with this namec 
        const checkCourseByName= await courseModel.findOne({instituteId:instituteId,name:name})
        console.log("Check Course : ",checkCourseByName)
        if(checkCourseByName){
            console.log('Course Already Registered With This Name')
            return res.status(401).json({message:"Course Already Registered",checkCourseByName})
        }
        const checkStatusOfSubscription =checkSubscription.status
        if(checkStatusOfSubscription !=="Active"){
            console.log("Subscription Status is not Active")
            return res.status(200).json({message:"Subscription Status is Inactive"})
        } 
        const checkScopeOfSubscription = checkSubscription.scopeType
            console.log(checkScopeOfSubscription)
        if(checkScopeOfSubscription == "individual"){
            console.log('Subscription Status is for Individual')
            const noOfCoursesAlreadyCreatedByAnInstitute = await courseModel.find({instituteId:instituteId})
            console.log("Already Register Courses : ",noOfCoursesAlreadyCreatedByAnInstitute)
            if(noOfCoursesAlreadyCreatedByAnInstitute.length>=1){
                console.log("This Institute can Only Register One Course")
                return res.status(200).json({message:"Already Register Course :",noOfCoursesAlreadyCreatedByAnInstitute})
            }
           const createACourse = await courseModel.create({name:name,instituteId:instituteId,instructorTeached:instructorTeached})
           if(!createACourse){
            console.log("Course Creation Unsuccessfull")
            return res.status(400).json({message:"Course Creation Unsuccessfull"})
           }
           console.log("Course Creation Successfully",createACourse)
           return res.status(200).json({message:"Course Create Successfully",createACourse})
        }

        const createACourse = await courseModel.create({name:name,instituteId:instituteId,department:departmentId,ForSemester:forSemester,ForClass:forClass,creditHours:creditHours})

if(!createACourse){
            console.log("Course Creation Unsuccessfull")
            return res.status(400).json({message:"Course Creation Unsuccessfull"})
           }
           console.log("Course Creation Successfully",createACourse)
           return res.status(200).json({message:"Course Create Successfully",createACourse})
           
           
        // const getSubscriptionPlanStatus = await subscriptionPlanModel.findById(subscriptionPlanId)
        // console.log("Subscription Plan Id : ",subscriptionPlanId)

    // console.log("You can Register Course")
    
        // return res.status(200).json({message:"Check Subscription :",checkSubscription})
    // const dataObject = {name:name,
        //         department:departmentId,
        //         ForSemester:forSemester,
        //         code:code,
        //         creditHours:creditHours,
        //         instituteId:instituteId
        // }
        // console.log("Data Object",dataObject)
        // const createCourse = await courseModel.create(dataObject)
        // if(!createCourse){
        //     console.log("Not Able to Create Course")
        //     return res.status(404).json({message:"Not able to create Course"})
        // }
        // if(departmentId){

        //     const findDepartment = await department.findById(departmentId)
        //     if(!findDepartment){
        //         console.log("Department not Found")
        //         return res.status(404).json({message:"Department not Found"})
        //     }
        //         const departmentName= findDepartment.name
        //         createCourse.deprtmentName=departmentName
        //         await createCourse.save()
        // }
        // return res.status(200).json({message:"Course Registration Successfully",createCourse})

    } catch (error) {
        console.log('Error in Course Registration Function',error)
        return res.status(404).json({message:"Error in Course Registration Function",error})
    }
}

const updationInCourse=async(req,res)=>{
    try {
        const {id}= req.params
        const updateData = req.body
        const updatedData = await courseModel.findOneAndUpdate({_id:id},updateData,{new:true})
        if(!updatedData){
            console.log("Not able to update Data")
            return res.status(404).json({message:'Not able to update Data'})
        }
        console.log('Data updated Successfully')
        return res.status(200).json({message:"Data updated Successfully",updatedData})
    } catch (error) {
        console.log('Error in Updated Data function',error)
        return res.status(404).json({message:"Error in Updated Data function",error})
    }
}

const courseDeletion= async(req,res)=>{
    try {
        const {id}= req.body
        const deleteCourse= await courseModel.findByIdAndDelete(id)
        if(!deleteCourse){
            console.log("Not Able to Delete Course")
            return res.status(402).json({message:"Course Not Deleted"})
        }
        console.log("Course Deleted Successfully",deleteCourse)
        return res.status(200).json({message:"Course Deleted Successfully",deleteCourse})
    } catch (error) {
        console.log('Error in Course Deletion Function',error)
        return res.status(404).json({message:"Course Deleted Successfully",error})
    }
}

// const studentEnrollmentInCourse = async(req,res)=>{
//     try {
//         const {studentId, courseId ,instituteId}=req.body
        
//     } catch (error) {
        
//     }
// }

const getCompleteCourseUpdate = async (req,res)=>{
    try {
        const {courseId} = req.body
        const getInfoAboutCourse = await courseModel.findById(courseId)
        const getInstituteId = getInfoAboutCourse.instituteId
        const getInstituteName = await instituteModel.findById(getInstituteId).select("name")
        console.log(getInstituteName)
        if(!getInfoAboutCourse || !getInstituteName){
            console.log("Issue in Course Id or Institute Id")
            return res.status(400).json({message:"Issue in Course Id or Institute Id"})
        }
        console.log("This is complete Information About Course")
        return res.status(200).json({message:"This is Complete Information About the Course",getInfoAboutCourse,getInstituteName})
    } catch (error) {
        console.log("Error in Get Course Updation",error)
        return res.status(404).json({message:"Error in Getting Course Updation",error})
    }
}

const assignInstructorToCourse = async(req,res)=>{
    try{
        const {courseId,instructorId}=req.body
        let checkCourseUpdate = await courseModel.findById(courseId)
        if(checkCourseUpdate){
            console.log("No Course Available With This ID")
            return res.status(400).json({message:"No Course Available With This Id"}) 
              }
        const checkInstructorUpdate = await staffModel.findById(instructorId)
          
        const checkInstituteIdOfCourse = checkCourseUpdate.instituteId
        const checkInstituteIdOfInstructor= checkInstructorUpdate.instituteId
        
        if(!(checkInstituteIdOfCourse.toString())==(checkInstituteIdOfInstructor.toString())){
            console.log("Instructor is not of Same Institute as of Course")
            return res.status(400).json({message:"Instructor is not of Same Institute as of Course"})
        }

        let checkAlreadyAssignTeacher = checkCourseUpdate.instructorTeached
        console.log("Already Assign Instructor : ",checkAlreadyAssignTeacher)

        checkCourseUpdate.instructorTeached= instructorId
        await checkCourseUpdate.save()

        return res.status(200).json({message:"Instructor Assigned Succesfully"})
    }
    catch(error){
        console.log("Error in Assign Instructor To Course",error)
        return res.status(404).json({message:"Error in Assign Instructor To Course",error})
    }
}

module.exports={courseCreation,updationInCourse,courseDeletion,getCompleteCourseUpdate,assignInstructorToCourse} 