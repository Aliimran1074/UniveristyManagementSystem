const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model");
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model");
const studentRegistrationModel = require("../../Models/UserModels/studentRegistration.model");
const staffModel = require("../../Models/UserModels/staff.model");
const superAdminMonthlyReportModel = require("../../Models/SuperAdminModels/superAdminMonthlyReport");
const {imageKitConfig} = require("../../ImageKit.IO Setup/setup") 

const PDFDocument = require("pdfkit");

const generateSuperAdminPDF = (data, aiUsage, last30DaysAI, monthName, year) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // ---------------- HEADER ----------------
      doc.fontSize(22).text("Super Admin Monthly Report", {
        align: "center"
      });

      doc.moveDown();
      doc.fontSize(16).text(`${monthName} ${year}`, {
        align: "center"
      });

      doc.moveDown(2);

      // ---------------- INSTITUTES ----------------
      doc.fontSize(14).text("Institute Statistics");
      doc.fontSize(12).text(`Total Institutes: ${data.totalInstitutes}`);
      doc.text(`Active Institutes: ${data.activeInstitutes}`);
      doc.text(`Expired Institutes: ${data.expiredInstitutes}`);
      doc.text(`New Institutes: ${data.newInstitutesThisMonth}`);

      doc.moveDown();

      // ---------------- USERS ----------------
      doc.fontSize(14).text("User Statistics");
      doc.fontSize(12).text(`Total Students: ${data.totalStudents}`);
      doc.text(`Total Staff: ${data.totalStaff}`);

      doc.moveDown();

      // ---------------- REVENUE ----------------
      doc.fontSize(14).text("Revenue");
      doc.fontSize(12).text(`Total Revenue: ${data.totalRevenue}`);

      doc.moveDown();

      // ---------------- AI USAGE ----------------
      doc.fontSize(14).text("AI Usage (Current Month)");
      doc.fontSize(12).text(`Total AI Requests: ${aiUsage.totalAiRequests}`);
      doc.text(`Assignment Generator: ${aiUsage.assignmentGeneratorUsed}`);
      doc.text(`Quiz Generator: ${aiUsage.quizGeneratorUsed}`);
      doc.text(`Exam Generator: ${aiUsage.examGeneratorUsed}`);
      doc.text(`Content Generator: ${aiUsage.contentGeneratorUsed}`);
      doc.text(`Assignment Checker: ${aiUsage.assignmentCheckerUsed}`);
      doc.text(`Quiz Checker: ${aiUsage.quizCheckerUsed}`);

      doc.moveDown();

      // ---------------- LAST 30 DAYS ----------------
      doc.fontSize(14).text("AI Usage (Last 30 Days)");
      doc.fontSize(12).text(`Total AI Requests: ${last30DaysAI.totalAiRequests}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

const imageKit = require("../../ImageKit.IO Setup/setup");

const generateSuperAdminMonthlyReport = async (req, res) => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const monthName = today.toLocaleString("default", { month: "long" });

    const subscriptions = await subscriptionModel.find();

    // ---------------- AI SNAPSHOT ----------------
    let currentAI = {
      totalAiRequests: 0,
      assignmentGeneratorUsed: 0,
      quizGeneratorUsed: 0,
      examGeneratorUsed: 0,
      contentGeneratorUsed: 0,
      assignmentCheckerUsed: 0,
      quizCheckerUsed: 0
    };

    subscriptions.forEach(sub => {
      const ai = sub.aiUsage || {};
      Object.keys(currentAI).forEach(key => {
        currentAI[key] += ai[key] || 0;
      });
    });

    // ---------------- REVENUE ----------------
    const totalRevenue = subscriptions.reduce((sum, sub) => {
      return sum + (sub.amountPaid || sub.price || 0);
    }, 0);

    // ---------------- OTHER STATS ----------------
    const totalInstitutes = await instituteModel.countDocuments();
    const activeInstitutes = await subscriptionModel.countDocuments({ status: "Active" });
    const expiredInstitutes = await subscriptionModel.countDocuments({ status: "Expired" });

    const newInstitutesThisMonth = await instituteModel.countDocuments({
      createdAt: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0)
      }
    });

    const totalStudents = await studentRegistrationModel.countDocuments();
    const totalStaff = await staffModel.countDocuments();

    // ---------------- LAST 30 DAYS (simple fallback) ----------------
    const last30DaysAI = { ...currentAI }; // if no previous report available

    // ---------------- PDF GENERATION ----------------
    const pdfBuffer = await generateSuperAdminPDF(
      {
        totalInstitutes,
        activeInstitutes,
        expiredInstitutes,
        newInstitutesThisMonth,
        totalStudents,
        totalStaff,
        totalRevenue
      },
      currentAI,
      last30DaysAI,
      monthName,
      year
    );

    // ---------------- IMAGEKIT UPLOAD ----------------
    const fileName = `superadmin_report_${monthName}_${year}.pdf`;

    const uploadResponse = await imageKitConfig.upload({
      file: pdfBuffer,
      fileName: fileName
    });

    const pdfUrl = uploadResponse.url;

    // ---------------- SAVE REPORT ----------------
    const report = await superAdminMonthlyReportModel.create({
      month,
      year,
      totalInstitutes,
      activeInstitutes,
      expiredInstitutes,
      newInstitutesThisMonth,
      totalStudents,
      totalStaff,
      totalRevenue,
      aiUsage: currentAI,
      reportPdf: pdfUrl
    });

    return res.status(200).json({
      message: "Super Admin Report Generated Successfully",
      pdfUrl,
      report
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error generating report",
      error: error.message
    })
  }
}

module.exports = { generateSuperAdminMonthlyReport }