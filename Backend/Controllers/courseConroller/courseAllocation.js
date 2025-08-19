const courseModel = require('../../Models/CourseModels/course.model')
const staffModel = require('../../Models/UserModels/staff.model')


//courses can be select by instructor or given by HOD (no more than 3 courses)
const courseAllocation = async(req,res)=>{      
    try {
        const {selectorId}  = req.params
        const {instructorId,coursesIds}= req.body

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
        // check no of Courses already registered by instructor
        const alreadyRegisteredCourse = await courseModel.find({instructorTeached:instructorId})
        // return res.status(200).json({message:"Already Registered Courses",alreadyRegisteredCourse})
        
        // check course is registered by someone else or not
        
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