const cron = require("node-cron");
const { generateInstituteMonthlyReport} = require("../Controllers/SuperAdminReportController/superAdmin.report.controller");

const subscriptionModel = require("../Models/SuperAdminModels/subscription.model");

// Run at 12:00 AM on the 1st day of every month
cron.schedule("0 0 1 * *", async () => {
  console.log("Monthly Report Cron Running...");

  try {
    const subscriptions = await subscriptionModel.find({});

    for (const sub of subscriptions) {
      try {
        await generateInstituteMonthlyReport(sub._id);
        console.log(`Report generated for ${sub._id}`);
      } catch (err) {
        console.error(
          `Error generating report for ${sub._id}:`,
          err.message
        );
      }
    }
  } catch (err) {
    console.error("Cron Job Error:", err.message);
  }
})