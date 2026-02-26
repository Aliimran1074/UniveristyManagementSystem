// We will here how to create superadmin report

const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model")
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")
const { subscriptionPlanModel } = require("../../Models/SuperAdminModels/subscriptionsPlan.model")
const superadminMonthlyreportModel = require("../../Models/SuperAdminModels/superadminMonthlyreport.model")

const createReport = async (req, res) => {
    try {
        const { instituteId, subscriptionId } = req.body
        const instituteInformation = await instituteModel.findById(instituteId)

        // const createReport = await superadminMonthlyreportModel.create({ instituteId: instituteId, instituteName: instituteName, subscriptionId: subscriptionId, reportMonth: month, reportYear: year, subscriptionSnapshot: subscriptionSnapShot })

        if (!instituteInformation) {
            console.log("Institute Info :", instituteInformation)
            return res.status(200).json({ message: "Institute not Found " })
        }

        // here we will calcualte report month if current month is feburaray obviously it will generate report of Jan
        const todayDate = new Date()
        const month = todayDate.getMonth()
        const year = todayDate.getFullYear()

        // institute Name for report
        const instituteName = instituteInformation.name
        const instituteContactNo = instituteInformation.contactNo

        const subscription = await subscriptionModel.findById(subscriptionId)
        if (!subscription) {
            console.log("Subscription not Found")
            return res.status(200).json({ message: "Subscription not Found" })
        }
        // return res.status(200).json({message:"Subscription Found",subscriptionPlan})
        // 
        // get subscriptionPlan 
        const subscriptionPlanId = subscription.planId

        // get Plan Info 
        const getPlanInfo = await subscriptionPlanModel.findById(subscriptionPlanId)
        const subscriptionName = getPlanInfo.subscriptionName
        const getPrice = getPlanInfo.price
        const getDuration = getPlanInfo.durationDays
        const getStartDate = subscription.startDate
        const getEndDate = subscription.endDate

        // readable dates 
        const readableStartDate = new Date(getStartDate).toLocaleDateString()
        const readableEndDate = new Date(getEndDate).toLocaleDateString()
        const currentDate = new Date()
        const currentDateToReadableForm = new Date(currentDate).toLocaleDateString()
        // const endDate = new Date(getEndDate)
        getEndDate.setHours(0, 0, 0, 0)
        currentDate.setHours(0, 0, 0, 0)
        const calculateRemainingDays = getEndDate - currentDate
        // change remaining days into a number

        const remainingDaysinNumber = Math.ceil(calculateRemainingDays / (24 * 60 * 60 * 1000))
        // console.log(remainingDaysinNumber)
        // console.log(currentDateToReadableForm)
        // console.log(readableStartDate)
        // console.log(readableEndDate)

        //set status after generating report on behave of days left 
        let status = 'active'
        if (remainingDaysinNumber < 30) {
            status = 'expiring_soon'

        }
        else if (remainingDaysinNumber < 0) {
            status = 'expired'
        }

        const subscriptionSnapShot = {
            planName: subscriptionName,
            price: getPrice,
            durationDays: getDuration,
            startDate: readableStartDate,
            expiryDate: readableEndDate,
            remainingDays: remainingDaysinNumber,
            status: status
        }

        // get ai status 
        const getAiStatus = getPlanInfo.aiFeatures.enabled
        console.log(getAiStatus)

        const recommendedActions =[{type:'no_action'}]        //this is just for dummy purchase main will done why institute creating and working


        if (getAiStatus) {
            const getAiUsage = subscription.aiUsage
            const assignmentGeneratorUseCount = getAiUsage.assignmentGeneratorUsed
            const quizGeneratorUseCount = getAiUsage.quizGeneratorUsed
            const examGeneratorUseCount = getAiUsage.examGeneratorUsed
            const contentGeneratorUseCount = getAiUsage.contentGeneratorUsed
            const assignmentCheckerUseCount = getAiUsage.assignmentCheckerUsed
            const quizCheckerUseCount = getAiUsage.quizCheckerUsed

            const totalAiRequestCount = Number(assignmentCheckerUseCount + quizGeneratorUseCount + examGeneratorUseCount + assignmentGeneratorUseCount + contentGeneratorUseCount + quizCheckerUseCount)

            console.log("Total AI Request Count is :", totalAiRequestCount)

            const aiUsage = {
                enabled: true,
                assignmentGeneratorUsed: assignmentGeneratorUseCount,
                quizGeneratorUsed: quizGeneratorUseCount,
                examGeneratorUsed: examGeneratorUseCount,
                contentGeneratorUsed: contentGeneratorUseCount,
                assignmentCheckerUsed: assignmentCheckerUseCount,
                quizCheckerUsed: quizCheckerUseCount,
                totalAiRequests: totalAiRequestCount
            }
            const createReport = await superadminMonthlyreportModel.create({ instituteId: instituteId, instituteName: instituteName, subscriptionId: subscriptionId, reportMonth: month, reportYear: year, subscriptionSnapshot: subscriptionSnapShot, recommendedActions: recommendedActions, aiUsage: aiUsage })

            console.log("Report Created Successfully", createReport)
            return res.status(200).json({ message: "Report Created Successfully" })

        }

        else {
            const createReport = await superadminMonthlyreportModel.create({ instituteId: instituteId, instituteName: instituteName, subscriptionId: subscriptionId, reportMonth: month, reportYear: year, subscriptionSnapshot: subscriptionSnapShot, recommendedActions: recommendedActions })

            console.log("Report Created Successfully", createReport)
            return res.status(200).json({ message: "Report Created Successfully" })
        }


        // activity status work is remaining this will done after one or institute creation and testing

        // just for testing purpose 

        // const createReport= await superadminMonthlyreportModel.create()

        // return res.status(200).json({message:"This is Plan Information",getPlanInfo})
        // want to work on product snapshot



        // Now to work on snapshot and other calculation  20/2/26


        // return res.status(400).json({message:'Sorry we are unable to find Institute Information'})
    }
    catch (error) {
        console.log("Error in Create Report Function", error)
        return res.status(404).json({ message: "Error in Create Report Function", error })
    }
}

module.exports = { createReport }