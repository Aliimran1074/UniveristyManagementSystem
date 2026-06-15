// const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model")
// const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")
// const subscriptionPlanModel = require("../../Models/SuperAdminModels/subscriptionsPlan.model")
// // const superAdminMonthlyReportModel  = require("../../Models/SuperAdminModels/monthlyInstituteReport.model")
// const studentRegistrationModel = require("../../Models/UserModels/studentRegistration.model")
// const staffModel = require("../../Models/UserModels/staff.model")
// const monthlyInstituteReportModel = require("../../Models/SuperAdminModels/monthlyInstituteReport.model")
// const { instituteMonthlyReportModel } = require("../../Models/SuperAdminModels/instituteMonthlyReport.model")
// const {imageKitConfig} = require("../../ImageKit.IO Setup/setup") 
// const pdfDocument= require('pdfkit')
// const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


// const monthReportPdf = (data,aiData,month,year) => {
//       return new Promise((resolve, reject) => {
//         try {
//             const doc = new pdfDocument()
//             const buffers = []
//             doc.on("data", buffers.push.bind(buffers))
//             doc.on("end", () => {
//                 const pdfBuffer =
//                     Buffer.concat(buffers)
//                 resolve(pdfBuffer)
//             })
//             doc.fontSize(20)
//             doc.text(`Monthly Report`)
//             doc.text(`${month} ${year}`)
//             doc.moveDown()
//             doc.text(`Institute: ${data.institute}`)
//             doc.text(`Plan: ${data.plan}`)
//             doc.text(`Students: ${data.totalStudents}`)
//             doc.text(`Staff: ${data.totalStaff}`)
//             doc.text(`Status: ${data.status}`)
           
//             if(aiData.aiStatus){
//                 doc.moveDown()
//                 doc.text(
//                  `Total AI Requests: ${aiData.aiUsage.totalAiRequest}`
//                 )
//             }
//             doc.end()
//         } catch(error){
//             reject(error)
//         }
//     })
// }


// // is function me last 30 days ki report wala kaam karna hai 
// const individualInstituteReportMonthlyReport = async (req,res) => {
//     try {
//         const { subscriptionId } = req.body
//         const subscriptionDetails = await subscriptionModel.findById(subscriptionId)
//         if(!subscriptionDetails){
//    return res.status(404).json({
//       message:"Subscription not found"
//    })
// }
//         const instituteId = subscriptionDetails.instituteId
//         const planId = subscriptionDetails.planId
//         const subscriptionPlanDetails = await subscriptionPlanModel.findById(planId)
//         const planName = subscriptionPlanDetails.subscriptionName
//         const aiStatus = subscriptionPlanDetails.aiFeatures.enabled
// const institute = await instituteModel.findOne(
//     { _id: instituteId },
//     { name: 1, _id: 0 }
// ).lean()

// if(!institute){
//     return res.status(404).json({
//         message:"Institute not found"
//     })
// }
// const instituteName = institute.name
//         console.log("Institute Name is :", instituteName)
//         const scopeType = subscriptionDetails.scopeType
//         const startDate = subscriptionDetails.startDate
//         const endDate = subscriptionDetails.endDate

//         const startDateInReadableFormat = startDate.toLocaleDateString()
//         const endDateInReadableFormat = endDate.toLocaleDateString()

//         const today = new Date()

// const daysLeftCalculation = Math.ceil(
//     (endDate - today) / (1000 * 60 * 60 * 24)
// )
//         const activationStatus = subscriptionDetails.status
//         const getMonth = new Date().getMonth() + 1
//         const year = new Date().getFullYear()
//         const studentsCount = await studentRegistrationModel.countDocuments({ instituteId })
//         const staffCount = await staffModel.countDocuments({ instituteId })
//         const data = {
//             institute: instituteName,
//             scopeType: scopeType,
//             registrtionDate: startDateInReadableFormat,
//             endDate: endDateInReadableFormat,
//             plan: planName,
//             status: activationStatus,
//             totalStudents: studentsCount,
//             totalStaff: staffCount,
//             daysLeft: daysLeftCalculation
//         }

//                 const assignmentGeneratorUsage= subscriptionDetails.aiUsage.assignmentGeneratorUsed
//                 const quizGeneratorUsage=subscriptionDetails.aiUsage.quizGeneratorUsed
//                 const contentGeneratorUsage=subscriptionDetails.aiUsage.contentGeneratorUsed
//                 const quizCheckerUsage=subscriptionDetails.aiUsage.quizCheckerUsed
//                 const assignmentCheckerUsage=subscriptionDetails.aiUsage.assignmentCheckerUsed
//                 const totalAiRequest = Number (assignmentGeneratorUsage+quizGeneratorUsage+contentGeneratorUsage+quizCheckerUsage+assignmentCheckerUsage)    
              
//                 const aiUsage={assignmentCheckerUsage,quizCheckerUsage,contentGeneratorUsage,assignmentGeneratorUsage,quizGeneratorUsage,totalAiRequest}
        
//                 let aiDataObject = {}
//         if (!aiStatus) {
//             aiDataObject = { aiStatus, aiUsage: null }
//         }
//         else{
//             aiDataObject = { aiStatus, aiUsage: aiUsage }
//     }
//             const pdfFile =await  monthReportPdf(data, aiDataObject,monthArray[getMonth-1],year)
//             if (pdfFile) {
//                 const createMonthlyReport = await instituteMonthlyReportModel.create({ instituteId: instituteId, instituteName: instituteName, month: getMonth, year: year })
//                 if(!createMonthlyReport){
//                     console.log("Issue in Storing Data in Monthly Report Schema")
//                     return res.status(400).json({message:"Issue in Storing Data in Monthly Report Schema"})
//                 }
//             const fileName = `${instituteName}_${monthArray[getMonth-1]}_report`
                        
//             const imageKitResponse= await imageKitConfig.upload({
//                 file:pdfFile,
//                 fileName:fileName})
//                 const imageKitUrl= imageKitResponse.url
//                console.log('Image kit url ', imageKitResponse.url)
//                 if(imageKitUrl){
//                     createMonthlyReport.reportPdf=imageKitUrl
//                     await createMonthlyReport.save()
//                     return res.status(200).json({message:"Report Created Successfully",createMonthlyReport})
//                 }
                
//             }
//             return res.status(400).json({ message: "Issue in Creating PDF" })
//         }
//      catch (error) {
//         console.log("Error in Creating Monthly Report of Individual Institute",error)
//         return res.status(404).json({message:"Error in Creating Monthly Report of Individual Institute"})
//     }
// }




// const createReport = async (req, res) => {
//     try {
//         const { instituteId, subscriptionId } = req.body
//         const instituteInformation = await instituteModel.findById(instituteId)

//         // const createReport = await superadminMonthlyreportModel.create({ instituteId: instituteId, instituteName: instituteName, subscriptionId: subscriptionId, reportMonth: month, reportYear: year, subscriptionSnapshot: subscriptionSnapShot })

//         if (!instituteInformation) {
//             console.log("Institute Info :", instituteInformation)
//             return res.status(200).json({ message: "Institute not Found " })
//         }

//         // here we will calcualte report month if current month is feburaray obviously it will generate report of Jan
//         const todayDate = new Date()
//         const month = todayDate.getMonth()
//         const year = todayDate.getFullYear()

//         // institute Name for report
//         const instituteName = instituteInformation.name
//         const instituteContactNo = instituteInformation.contactNo

//         const subscription = await subscriptionModel.findById(subscriptionId)
//         if (!subscription) {
//             console.log("Subscription not Found")
//             return res.status(200).json({ message: "Subscription not Found" })
//         }
//         // return res.status(200).json({message:"Subscription Found",subscriptionPlan})
//         // 
//         // get subscriptionPlan 
//         const subscriptionPlanId = subscription.planId

//         // get Plan Info 
//         const getPlanInfo = await subscriptionPlanModel.findById(subscriptionPlanId)
//         const subscriptionName = getPlanInfo.subscriptionName
//         const getPrice = getPlanInfo.price
//         const getDuration = getPlanInfo.durationDays
//         const getStartDate = subscription.startDate
//         const getEndDate = subscription.endDate

//         // readable dates 
//         const readableStartDate = new Date(getStartDate).toLocaleDateString()
//         const readableEndDate = new Date(getEndDate).toLocaleDateString()
//         const currentDate = new Date()
//         const currentDateToReadableForm = new Date(currentDate).toLocaleDateString()
//         // const endDate = new Date(getEndDate)
//         getEndDate.setHours(0, 0, 0, 0)
//         currentDate.setHours(0, 0, 0, 0)
//         const calculateRemainingDays = getEndDate - currentDate
//         // change remaining days into a number

//         const remainingDaysinNumber = Math.ceil(calculateRemainingDays / (24 * 60 * 60 * 1000))
//         // console.log(remainingDaysinNumber)
//         // console.log(currentDateToReadableForm)
//         // console.log(readableStartDate)
//         // console.log(readableEndDate)

//         //set status after generating report on behave of days left 
//         let status = 'active'
//         if (remainingDaysinNumber < 30) {
//             status = 'expiring_soon'

//         }
//         else if (remainingDaysinNumber < 0) {
//             status = 'expired'
//         }

//         const subscriptionSnapShot = {
//             planName: subscriptionName,
//             price: getPrice,
//             durationDays: getDuration,
//             startDate: readableStartDate,
//             expiryDate: readableEndDate,
//             remainingDays: remainingDaysinNumber,
//             status: status
//         }

//         // get ai status 
//         const getAiStatus = getPlanInfo.aiFeatures.enabled
//         console.log(getAiStatus)

//         const recommendedActions = [{ type: 'no_action' }]        //this is just for dummy purchase main will done why institute creating and working


//         if (getAiStatus) {
//             const getAiUsage = subscription.aiUsage
//             const assignmentGeneratorUseCount = getAiUsage.assignmentGeneratorUsed
//             const quizGeneratorUseCount = getAiUsage.quizGeneratorUsed
//             const examGeneratorUseCount = getAiUsage.examGeneratorUsed
//             const contentGeneratorUseCount = getAiUsage.contentGeneratorUsed
//             const assignmentCheckerUseCount = getAiUsage.assignmentCheckerUsed
//             const quizCheckerUseCount = getAiUsage.quizCheckerUsed

//             const totalAiRequestCount = Number(assignmentCheckerUseCount + quizGeneratorUseCount + examGeneratorUseCount + assignmentGeneratorUseCount + contentGeneratorUseCount + quizCheckerUseCount)

//             console.log("Total AI Request Count is :", totalAiRequestCount)

//             const aiUsage = {
//                 enabled: true,
//                 assignmentGeneratorUsed: assignmentGeneratorUseCount,
//                 quizGeneratorUsed: quizGeneratorUseCount,
//                 examGeneratorUsed: examGeneratorUseCount,
//                 contentGeneratorUsed: contentGeneratorUseCount,
//                 assignmentCheckerUsed: assignmentCheckerUseCount,
//                 quizCheckerUsed: quizCheckerUseCount,
//                 totalAiRequests: totalAiRequestCount
//             }
//             const createReport = await superadminMonthlyreportModel.create({ instituteId: instituteId, instituteName: instituteName, subscriptionId: subscriptionId, reportMonth: month, reportYear: year, subscriptionSnapshot: subscriptionSnapShot, recommendedActions: recommendedActions, aiUsage: aiUsage })

//             console.log("Report Created Successfully", createReport)
//             return res.status(200).json({ message: "Report Created Successfully" })

//         }

//         else {
//             const createReport = await superadminMonthlyreportModel.create({ instituteId: instituteId, instituteName: instituteName, subscriptionId: subscriptionId, reportMonth: month, reportYear: year, subscriptionSnapshot: subscriptionSnapShot, recommendedActions: recommendedActions })

//             console.log("Report Created Successfully", createReport)
//             return res.status(200).json({ message: "Report Created Successfully" })
//         }


//         // activity status work is remaining this will done after one or institute creation and testing

//         // just for testing purpose 

//         // const createReport= await superadminMonthlyreportModel.create()

//         // return res.status(200).json({message:"This is Plan Information",getPlanInfo})
//         // want to work on product snapshot



//         // Now to work on snapshot and other calculation  20/2/26


//         // return res.status(400).json({message:'Sorry we are unable to find Institute Information'})
//     }
//     catch (error) {
//         console.log("Error in Create Report Function", error)
//         return res.status(404).json({ message: "Error in Create Report Function", error })
//     }
// }

// module.exports = { createReport ,individualInstituteReportMonthlyReport }
const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model");
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model");
const subscriptionPlanModel = require("../../Models/SuperAdminModels/subscriptionsPlan.model");
const studentRegistrationModel = require("../../Models/UserModels/studentRegistration.model");
const staffModel = require("../../Models/UserModels/staff.model");
const { instituteMonthlyReportModel } = require("../../Models/SuperAdminModels/instituteMonthlyReport.model");
const { imageKitConfig } = require("../../ImageKit.IO Setup/setup");
const PDFDocument = require("pdfkit");

const monthArray = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// ---------------- PDF ----------------
const monthReportPdf = (data, aiData, month, year) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));

      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      doc.fontSize(18).text("Monthly Institute Report", { align: "center" });
      doc.text(`${month} ${year}`, { align: "center" });
      doc.moveDown(2);

      doc.fontSize(12).text(`Institute: ${data.institute}`);
      doc.text(`Plan: ${data.plan}`);
      doc.text(`Students: ${data.totalStudents}`);
      doc.text(`Staff: ${data.totalStaff}`);
      doc.text(`Status: ${data.status}`);

      doc.moveDown(2);
      doc.fontSize(14).text("AI Usage Summary", { underline: true });
      doc.moveDown(1);

      if (!aiData?.aiUsage) {
        doc.text("AI Disabled");
        doc.end();
        return;
      }

      const ai = aiData.aiUsage;

      const rows = [
        ["Assignment Generator", ai.assignmentGeneratorUsed],
        ["Quiz Generator", ai.quizGeneratorUsed],
        ["Content Generator", ai.contentGeneratorUsed],
        ["Assignment Checker", ai.assignmentCheckerUsed],
        ["Quiz Checker", ai.quizCheckerUsed],
        ["Total Requests", ai.totalAiRequests],
      ];

      let y = doc.y + 10;

      doc.fontSize(10);
      rows.forEach((r) => {
        doc.text(r[0], 50, y);
        doc.text(String(r[1] || 0), 300, y);
        y += 18;
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

// ---------------- MAIN FUNCTION ----------------
const individualInstituteReportMonthlyReport = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await subscriptionModel.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const instituteId = subscription.instituteId;
    const planId = subscription.planId;

    const plan = await subscriptionPlanModel.findById(planId);
    const institute = await instituteModel.findById(instituteId).lean();

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // ---------------- STATS ----------------
    const totalStudents = await studentRegistrationModel.countDocuments({ instituteId });
    const totalStaff = await staffModel.countDocuments({ instituteId });

    // ---------------- AI USAGE ----------------
    const ai = subscription.aiUsage || {};

    const aiUsage = {
      assignmentGeneratorUsed: ai.assignmentGeneratorUsed || 0,
      quizGeneratorUsed: ai.quizGeneratorUsed || 0,
      contentGeneratorUsed: ai.contentGeneratorUsed || 0,
      assignmentCheckerUsed: ai.assignmentCheckerUsed || 0,
      quizCheckerUsed: ai.quizCheckerUsed || 0,
      totalAiRequests:
        (ai.assignmentGeneratorUsed || 0) +
        (ai.quizGeneratorUsed || 0) +
        (ai.contentGeneratorUsed || 0) +
        (ai.assignmentCheckerUsed || 0) +
        (ai.quizCheckerUsed || 0)
    };

    // ---------------- DATA ----------------
    const data = {
      institute: institute.name,
      plan: plan.subscriptionName,
      totalStudents,
      totalStaff,
      status: subscription.status
    };

    const aiData = {
      aiStatus: plan.aiFeatures?.enabled,
      aiUsage
    };

    // ---------------- PDF ----------------
    const pdfBuffer = await monthReportPdf(
      data,
      aiData,
      monthArray[month - 1],
      year
    );

    // ---------------- UPLOAD ----------------
    const fileName = `${institute.name}_${monthArray[month - 1]}_${year}`;

    const upload = await imageKitConfig.upload({
      file: pdfBuffer,
      fileName
    });

    const reportUrl = upload.url;

    // ---------------- SAVE TO DB ----------------
    const report = await instituteMonthlyReportModel.create({
      instituteId,
      instituteName: institute.name,
      month,
      year,

      totalStudents,
      totalStaff,

      aiUsage,

      reportPdf: reportUrl
    });

    return res.status(200).json({
      message: "Monthly report generated successfully",
      report
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({
      message: "Error generating report",
      error: error.message
    })
  }
}

const generateInstituteMonthlyReport = async (subscriptionId) => {
  const subscription = await subscriptionModel.findById(subscriptionId);
  if (!subscription) return null;

  const instituteId = subscription.instituteId;
  const planId = subscription.planId;

  const plan = await subscriptionPlanModel.findById(planId);
  const institute = await instituteModel.findById(instituteId).lean();

  if (!institute) return null;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const totalStudents = await studentRegistrationModel.countDocuments({ instituteId });
  const totalStaff = await staffModel.countDocuments({ instituteId });

  const ai = subscription.aiUsage || {};

  const aiUsage = {
    assignmentGeneratorUsed: ai.assignmentGeneratorUsed || 0,
    quizGeneratorUsed: ai.quizGeneratorUsed || 0,
    contentGeneratorUsed: ai.contentGeneratorUsed || 0,
    assignmentCheckerUsed: ai.assignmentCheckerUsed || 0,
    quizCheckerUsed: ai.quizCheckerUsed || 0,
    totalAiRequests:
      (ai.assignmentGeneratorUsed || 0) +
      (ai.quizGeneratorUsed || 0) +
      (ai.contentGeneratorUsed || 0) +
      (ai.assignmentCheckerUsed || 0) +
      (ai.quizCheckerUsed || 0),
  };

  const data = {
    institute: institute.name,
    plan: plan.subscriptionName,
    totalStudents,
    totalStaff,
    status: subscription.status,
  };

  const pdfBuffer = await monthReportPdf(
    data,
    { aiStatus: plan.aiFeatures?.enabled, aiUsage },
    monthArray[month - 1],
    year
  )

  const upload = await imageKitConfig.upload({
    file: pdfBuffer,
    fileName: `${institute.name}_${month}_${year}`
  })

  const report = await instituteMonthlyReportModel.create({
    instituteId,
    instituteName: institute.name,
    month,
    year,
    totalStudents,
    totalStaff,
    aiUsage,
    reportPdf: upload.url,
  });

  return report;
}

const generateInstituteReportController = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const report = await generateInstituteMonthlyReport(subscriptionId);

    if (!report) {
      return res.status(400).json({ message: "Report generation failed" });
    }

    return res.status(200).json({
      message: "Report generated",
      report
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
module.exports = { individualInstituteReportMonthlyReport,generateInstituteMonthlyReport,generateInstituteReportController }