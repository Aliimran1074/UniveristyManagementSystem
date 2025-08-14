const courseModel= require('../Models/CourseModels/course.model')
const department = require('../Models/Department/deparment.model')

const courseCreation= async (req,res)=>{
    try {
        const {name,departmentId,forSemester,code,creditHours}=req.body
        const checkCourseByName= await courseModel.findOne({name:name})
        if(checkCourseByName){
            console.log('Course Already Registered With This Name')
            return res.status(401).json({message:"Course Already Registered",checkCourseByName})
        }
        const dataObject = {name:name,
                department:departmentId,
                ForSemester:forSemester,
                code:code,
                creditHours:creditHours
        }
        console.log("Data Object",dataObject)
        const createCourse = await courseModel.create(dataObject)
        if(!createCourse){
            console.log("Not Able to Create Course")
            return res.status(404).json({message:"Not able to create Course"})
        }
        const findDepartment = await department.findById(departmentId)
        if(!findDepartment){
            console.log("Department not Found")
            return res.status(404).json({message:"Department not Found"})
        }
            const departmentName= findDepartment.name
            createCourse.deprtmentName=departmentName
            await createCourse.save()
        return res.status(200).json({message:"Course Registration Successfully",createCourse})

    } catch (error) {
        console.log('Error in Course Registration Function',error)
        return res.status(404).json({message:"Error in Course Registration Function",error})
    }
}

module.exports={courseCreation} 