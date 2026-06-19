const cron = require("node-cron")
const assignmentTopicModel = require("../Models/AssignmentInputModel/assignment.input.model")

const {
    processAssignmentTopic
} = require("../Controllers/AssesmentController/assignment.controller")

cron.schedule("* * * * *", async () => {
    console.log("Assignment Agent Running")
    try {
        const allTopics =
            await assignmentTopicModel.find({job:'pending'})
    
            if (!allTopics.length) {
    console.log("No task pending, skipping execution");
    return
}
        for (const topic of allTopics) {
            try { 
                const result =
                    await processAssignmentTopic(topic._id)
                console.log(
                    topic._id,
                    result.message
                )
            } catch (error) {
                console.log(
                    "Error Processing Topic:", 
                    topic._id,
                    error.message
                )
            }
        }
    } catch (error) {
        console.log(
            "Cron Error:",
            error.message
        )
    }

})
