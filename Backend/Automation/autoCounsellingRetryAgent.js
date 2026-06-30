const cron = require("node-cron")
const { runRetryAgent } = require("../Controllers/TimeTableController/Counselling Agent/counselling.retry.agent")

cron.schedule("0 */6 * * *", async () => {
  await runRetryAgent()
})