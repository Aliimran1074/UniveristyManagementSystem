const courseModel = require('../../Models/CourseModels/course.model')
const staffModel = require('../../Models/UserModels/staff.model')


//courses can be select by instructor or given by HOD (no more than 3 courses)
const courseAllocation = async(req,res)=>{      
    try {
        const {selectorId}  = req.params
        const {instructorId,coursesIds}= req.body

        const instructorOrNot = await staffModel.findById(instructorId)
        if(instructorOrNot.designation!=='Instructor'){
            console.log('Not a Instructor')
            return res.status(404).json({message:"Not a Instructor",instructorOrNot})
        }

        if(coursesIds.length>3){
            console.log("One Instructor can Only Register In Three Courses")
            return res.status(404).json({message:"One Instructor can Only register in Three Courses"})
        }
                if(!Array.isArray(coursesIds)){
            console.log('This is not  Array')
            return res.status(203).json({message:"This is not Array"})
        }
        // check selector is HOD or instructor
        const findSelector = await staffModel.findById(selectorId)
        if(!findSelector){
            console.log("No Staff available with this Id")
            return res.status(402).json({message:'No Staff with this Id'})
        }
    
        else if(findSelector.designation!=='Instructor' && findSelector.designation!=='HeadOfDepartment'){
            console.log("Designation:",findSelector.designation)
            console.log('Not a Valid User To Select Course')
            return res.status(403).json({message:"Selector is neither an Instructor nor HOD"})
        }
        const findInstructorDepartment  = await staffModel.findById(instructorId)
        if(!findInstructorDepartment){
            console.log("No Instructor Available with this Id")
            return res.status(404).json({message:"No Instructor Available with this id"})
        }
        const departmentIdOfInstructor = findInstructorDepartment.department.toString()
        console.log('Department Id of Instructor',departmentIdOfInstructor)
        const findCourses  =await courseModel.find({_id:{$in:coursesIds}})
        if(!findCourses){
            console.log("No Course Found")
            return res.status(404).json({message:"No Course Found"})
        }
        const arrayOfDepartmentId = findCourses.map((currentElement)=>{
                return currentElement.department
            })
            let sameDepartment = true
    for(let i=0;i<arrayOfDepartmentId.length;i++){
            console.log(arrayOfDepartmentId[i]._id.toString())
        if(departmentIdOfInstructor!==arrayOfDepartmentId[i]._id.toString()){
            console.log("Department of Both Is Different")
            sameDepartment=false
            break
        }
        console.log("Same Department")
    }
    if(!sameDepartment)
     {
        console.log("Department of Instructor and Course is Different ")
        return res.status(404).json({message:"Department of Instructor and Course is Different",sameDepartment})
     }
        // return res.status(200).json({message:"Courses Found",arrayOfDepartmentId,departmentIdOfInstructor})
        
        // check no of Courses already registered by instructor
        const alreadyRegisteredCourse = await courseModel.find({instructorTeached:instructorId}) 
        const registerCoursesLength =alreadyRegisteredCourse.length
        const coursesLength=coursesIds.length
        if(registerCoursesLength+coursesLength>3){
            console.log(`Can Only Register in ${3-registerCoursesLength}`)
            return res.status(202).json({message:`Can Only Register in ${3-registerCoursesLength}`})
        }
        const assignInstructor = await courseModel.updateMany({_id:{$in:coursesIds}},{instructorTeached:instructorId},{new:true})
        if(!assignInstructor){
            console.log("Issue in Assigning Course")
            return res.status(401).json({message:"Issue in Assigning Course"})
        }
        console.log('Instructor Assign Successfully')
        return res.status(200).json({message:"Instructor Assign Successfully",assignInstructor})
    } catch (error) {
        console.log("Issue in Course Allocation Function",error)
        return res.status(404).json({message:"Issue in course Allocation Function",error})
    }
}

module.exports={courseAllocation}