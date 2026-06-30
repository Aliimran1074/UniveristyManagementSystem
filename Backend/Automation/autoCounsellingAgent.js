const cron = require("node-cron")

const { runCounsellingAgent } =
require("../Controllers/TimeTableController/Counselling Agent/counselling.agent")

cron.schedule("* * * * *", async () => {

    await runCounsellingAgent()

})