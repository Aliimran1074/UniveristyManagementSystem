const assignmentTopicModel = require('../../Models/AssignmentInputModel/assignment.input.model')
const subscriptionModel = require('../../Models/SuperAdminModels/subscription.model')
const subscriptionPlanModel = require('../../Models/SuperAdminModels/subscriptionsPlan.model')
const staffModel = require('../../Models/UserModels/staff.model')
const courseModel = require('../../Models/CourseModels/course.model')
const assignmentTopicHandling = async (req, res) => {
    try {

        // const {instructorId,courseId,assignmentTopics}= req.body
        const { subscriptionId, courseId, staffId, duration, assignmentTopics } = req.body
        const subscriptionDetails = await subscriptionModel.findById(subscriptionId)

        // check weather subscription is with AI facilities or not
        const subscriptionPlanId = subscriptionDetails.planId

        const checkPlanHasAIFeaturesOrNot = await subscriptionPlanModel.findById(subscriptionPlanId)

        const isAIFeatureEnabled = checkPlanHasAIFeaturesOrNot.aiFeatures.enabled
        if (isAIFeatureEnabled == false) {
            return res.status(404).json({ message: "Only Those Institute who has Subscription With Ai Features can Use Assignment Creation With AI" })
        }
        // will done AI usage limit issue in future (3/5/26)
        const instituteId = subscriptionDetails.instituteId
        console.log("Institute Id :", instituteId)

        const getStaffInfo = await staffModel.findById(staffId)
        const getInstituteIdFromStaff = getStaffInfo.instituteId

        const courseInfo = await courseModel.findById(courseId)
        const getInstituteIdFromCourse = courseInfo.instituteId
        const instructorAssignedToCourse = courseInfo.instructorTeached

        console.log("Instructor Assign To Course", instructorAssignedToCourse)
        if (!instructorAssignedToCourse) {
            console.log("Cant Upload Assignment Untill Assign Instructor To Course")
            return res.status(400).json({ message: "Assignment Creation Failed Due To No Instructor Assigned" })
        }

        // match id of staff with the person who assign to teach course 
        if ((instructorAssignedToCourse.toString()) !== (staffId.toString())) {
            console.log("Only Assigned Instructor Can Create Assignement ID Mis Match")
            return res.status(404).json({ message: "Only Assigned Instructor Can Create Assignement ID Mis Match" })
        }
        const courseName = courseInfo.name

        console.log("Institute Id from Staff", getInstituteIdFromStaff)
        console.log("Institute Id from Course", getInstituteIdFromCourse)
        console.log("Institute Id from Subscription", instituteId)

        if (
            instituteId.toString() === getInstituteIdFromStaff.toString() &&
            instituteId.toString() === getInstituteIdFromCourse.toString()
        ) {
            const alreadyGiveTopicOfParticularCourseOrNot = await assignmentTopicModel.findOne({ course: courseId })
            if (!alreadyGiveTopicOfParticularCourseOrNot) {
                const createTopics = await assignmentTopicModel.create({ instituteId: instituteId, instructor:staffId, assignmentTopic: assignmentTopics,assignmentGapDuration:duration,course:courseId })
                if (!createTopics) {
                    console.log("Issue in Creating Topic")
                    return res.status(403).json({ message: "Issue in Creating Assignment Topic" })
                }
                console.log("Topic Created Successfully")
                return res.status(200).json({ message: "Assignment Topic Created Succesfully", createTopic })
            }

            const assignmentTopicArrayOfParticularCourse = alreadyGiveTopicOfParticularCourseOrNot.assignmentTopic
            if (assignmentTopicArrayOfParticularCourse.length + assignmentTopics.length > 6) {
                console.log(`Only Have Limit of 6 Assignment Uploading , Previous Assignment # ${assignmentTopicArrayOfParticularCourse.length} , You Can Only Add ${6-assignmentTopicArrayOfParticularCourse.length} Assignment`  )
                return res.status(201).json({ message: `Only Have Limit of 6 Assignment Uploading , Previous Assignment # ${assignmentTopicArrayOfParticularCourse.length} , You Can Only Add ${6-assignmentTopicArrayOfParticularCourse.length} Assignment` })
            }
            // check duplication of topic 
            for (let i = 0; i < assignmentTopicArrayOfParticularCourse.length; i++) {
                for (let j = 0; j < assignmentTopics.length; j++) {
                    if (assignmentTopicArrayOfParticularCourse[i].toLowerCase() == assignmentTopics[j].toLowerCase()) {
                        console.log(`This Topic is already assigned ,please change topic name ${assignmentTopics[j]}`)
                        return res.status(202).json({ message: `This Topic Already Assigned ${assignmentTopics[j]}` })
                        // break
                    }
                }
            }

           const totalAssignment =  assignmentTopicArrayOfParticularCourse.push(...assignmentTopics)
            alreadyGiveTopicOfParticularCourseOrNot.assignmentTopics=totalAssignment
            await alreadyGiveTopicOfParticularCourseOrNot.save()
            console.log("Topic Created Successfully")
            return res.status(200).json({ message: "Assignment Topic Created Succesfully", alreadyGiveTopicOfParticularCourseOrNot })
        }
        else {
            console.log("IDs MisMatched Either of Course , Instructor or Institute")
            return res.status(400).json({ message: "IDs MisMatched Either of Course , Instructor or Institute" })
        }

    } catch (error) {
        console.log("Error in Assignment Creating Function", error)
        res.status(400).json({ message: "Error in Assignment Creating Function", error })
    }
}

module.exports = {assignmentTopicHandling}