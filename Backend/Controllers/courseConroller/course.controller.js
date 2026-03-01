const courseModel= require('../../Models/CourseModels/course.model')
const department = require('../../Models/Department/deparment.model')



// wants to work little bit in it
const courseCreation= async (req,res)=>{
    try {
        const {name,departmentId,forSemester,code,creditHours,instituteId}=req.body
        console.log("Course Name ",name)


        // here we can check course with institute Id , if one course in a institute stored with a name so not allowed to create course with this name 
        const checkCourseByName= await courseModel.findOne({name:name})
        if(checkCourseByName){
            console.log('Course Already Registered With This Name')
            return res.status(401).json({message:"Course Already Registered",checkCourseByName})
        }
        const dataObject = {name:name,
                department:departmentId,
                ForSemester:forSemester,
                code:code,
                creditHours:creditHours,
                instituteId:instituteId
        }
        console.log("Data Object",dataObject)
        const createCourse = await courseModel.create(dataObject)
        if(!createCourse){
            console.log("Not Able to Create Course")
            return res.status(404).json({message:"Not able to create Course"})
        }
        if(departmentId){

            const findDepartment = await department.findById(departmentId)
            if(!findDepartment){
                console.log("Department not Found")
                return res.status(404).json({message:"Department not Found"})
            }
                const departmentName= findDepartment.name
                createCourse.deprtmentName=departmentName
                await createCourse.save()
        }
        return res.status(200).json({message:"Course Registration Successfully",createCourse})

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

module.exports={courseCreation,updationInCourse,courseDeletion} 