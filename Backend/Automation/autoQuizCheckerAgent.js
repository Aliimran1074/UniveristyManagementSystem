const cron = require("node-cron")
const quizUploadingModel = require("../Models/QuizModel/quizUploading.model")
const { quizCheckerCore } = require("../Controllers/AssesmentController/QuizController/quizChecker")

cron.schedule("* * * * *", async () => {
  console.log("Quiz Checker Agent Running")

  try {

    const uploads =
      await quizUploadingModel.find({
        status: "uncheck"
      })

    if (!uploads.length) {
      console.log("No pending quizzes")
      return
    }

    for (const upload of uploads) {

      const result =
        await quizCheckerCore(upload._id)

      console.log(upload._id, result.message)
    }

  } catch (error) {
    console.log("Cron Error:", error.message)
  }
})