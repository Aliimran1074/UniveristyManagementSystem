const cron = require("node-cron")
// const assignmentTopicModel = require("../Models/AssignmentInputModel/assignment.input.model")
const quizTopicModel=require('../Models/quizInputModel/quiz.input.model')
const {processQuizTopic} = require('../Controllers/AssesmentController/QuizController/quizHandlingUsingAI')

cron.schedule("0 0 * * *", async () => {
    console.log("Quiz Creation Agent Running")
    try {
        const allTopics =
            await quizTopicModel.find({job:'pending'})
    
            if (!allTopics.length) { 
    console.log("No task pending, skipping execution");
    return
}
       for (const topic of allTopics) {
    try {

        const result = await processQuizTopic(topic._id)

        console.log(
            topic._id,
            result?.message || "No message returned"
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
