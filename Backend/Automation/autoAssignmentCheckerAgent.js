const cron = require("node-cron")
const { runAssignmentCheckerCron } =
  require("../Controllers/AssesmentController/assignementCheckerUsingAI")

cron.schedule("0 0 * * *", async () => {
  console.log("Assignment Checker Agent Running")

  try {
    await runAssignmentCheckerCron()
  } catch (error) {
    console.log("Cron Error:", error.message)
  }
})