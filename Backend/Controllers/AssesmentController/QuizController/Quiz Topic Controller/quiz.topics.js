const subscriptionModel =require('../../../../Models/SuperAdminModels/subscription.model.js')
const subscriptionPlanModel = require('../../../../Models/SuperAdminModels/subscriptionsPlan.model')
const staffModel = require('../../../../Models/UserModels/staff.model')
const courseModel = require('../../../../Models/CourseModels/course.model')
const quizTopicModel = require('../../../../Models/quizInputModel/quiz.input.model.js')

const quizTopicHandling = async (req, res) => {
    try {

        // const {instructorId,courseId,quizTopics}= req.body
        const { subscriptionId, courseId, staffId, duration, quizTopics } = req.body
        const subscriptionDetails = await subscriptionModel.findById(subscriptionId)

        // check weather subscription is with AI facilities or not
        const subscriptionPlanId = subscriptionDetails.planId

        const checkPlanHasAIFeaturesOrNot = await subscriptionPlanModel.findById(subscriptionPlanId)

        const isAIFeatureEnabled = checkPlanHasAIFeaturesOrNot.aiFeatures.enabled
        if (isAIFeatureEnabled == false) {
            return res.status(404).json({ message: "Only Those Institute who has Subscription With Ai Features can Use Quiz Creation With AI" })
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
            console.log("Cant Upload Quiz Untill Assign Instructor To Course")
            return res.status(400).json({ message: "Quiz Creation Failed Due To No Instructor Assigned" })
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
            const alreadyGiveTopicOfParticularCourseOrNot = await quizTopicModel.findOne({ course: courseId })
            if (!alreadyGiveTopicOfParticularCourseOrNot) {
                const createTopics = await quizTopicModel.create({ instituteId: instituteId, instructor:staffId, quizTopics: quizTopics,quizGapDuration:duration,course:courseId })
                if (!createTopics) {
                    console.log("Issue in Creating Topic")
                    return res.status(403).json({ message: "Issue in Creating Quiz Topic" })
                }
                console.log("Topic Created Successfully")
                return res.status(200).json({ message: "Quiz Topic Created Succesfully", createTopics })
            }

            const quizTopicArrayOfParticularCourse = alreadyGiveTopicOfParticularCourseOrNot.quizTopics
            if (quizTopicArrayOfParticularCourse.length + quizTopics.length > 6) {
                console.log(`Only Have Limit of 6 Quiz Uploading , Previous Quiz # ${quizTopicArrayOfParticularCourse.length} , You Can Only Add ${6-quizTopicArrayOfParticularCourse.length} quiz`  )
                return res.status(201).json({ message: `Only Have Limit of 6 Quiz Uploading , Previous Quiz # ${quizTopicArrayOfParticularCourse.length} , You Can Only Add ${6-quizTopicArrayOfParticularCourse.length} Quiz` })
            }
            // check duplication of topic 
            for (let i = 0; i < quizTopicArrayOfParticularCourse.length; i++) {
                for (let j = 0; j < quizTopics.length; j++) {
                    if (quizTopicArrayOfParticularCourse[i].topicName.toLowerCase() == quizTopics[j].topicName.toLowerCase()) {
                        console.log(`This Topic is already assigned ,please change topic name ${quizTopics[j].topicName}`)
                        return res.status(202).json({ message: `This Topic Already Assigned ${quizTopics[j].topicName}` })
                        // break
                    }
                }
            }

          alreadyGiveTopicOfParticularCourseOrNot.quizTopics.push(...quizTopics)
            await alreadyGiveTopicOfParticularCourseOrNot.save()
            console.log("Topic Created Successfully")
            return res.status(200).json({ message: "Quiz Topic Created Succesfully", alreadyGiveTopicOfParticularCourseOrNot })
        }
        else {
            console.log("IDs MisMatched Either of Course , Instructor or Institute")
            return res.status(400).json({ message: "IDs MisMatched Either of Course , Instructor or Institute" })
        }

    } catch (error) {
        console.log("Error in Quiz Creating Function", error)
        res.status(400).json({ message: "Error in Quiz Creating Function", error })
    }
}

module.exports = {quizTopicHandling}