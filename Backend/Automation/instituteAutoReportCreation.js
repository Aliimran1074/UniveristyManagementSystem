const cron = require('node-cron')
// const {generateSuperAdminMonthlyReport} = require('../Controllers/SuperAdminReportController/mainSuperAdminMonthlyReport.controller')
const {individualInstituteReportMonthlyReport,generateInstituteMonthlyReport} =require('../Controllers/SuperAdminReportController/superAdmin.report.controller')
const subscriptionModel = require('../Models/SuperAdminModels/subscription.model')


cron.schedule("0 0 1 * *", async () => {
  console.log("Monthly Report Cron Running...");

  const subscriptions = await subscriptionModel.find({});

  for (const sub of subscriptions) {
    try {
      await generateInstituteMonthlyReport(sub._id);
      console.log(`Report generated for ${sub._id}`);
    } catch (err) {
      console.log("Error for subscription:", sub._id, err.message);
    }
  }
})
