// We will here how to create superadmin report

const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model")
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")

const createReport = async(req,res)=>{
    try{
        const {instituteId,subscriptionPlanId,reportMonth,reportYear}= req.body
        const instituteInformation = await instituteModel.findById(instituteId)
        if(instituteInformation){
            console.log("Institute Info :",instituteInformation)
            // return res.status(200).json({message:"This is Institute Information",instituteInformation})
        const subscriptionPlan =await subscriptionModel.findOne({instituteId:instituteId})
        if(!subscriptionPlan){
            console.log("Subscription Plan not Found")
            return res.status(200).json({message:"Subscription Plan not Found"})
        }
        return res.status(200).json({message:"Subscription Plan Found",subscriptionPlan})
        }
        return res.status(400).json({message:'Sorry we are unable to find Institute Information'})
    }
    catch(error){
        console.log("Error in Create Report Function",error)
        return res.status(404).json({message:"Error in Create Report Function",error})
    }
}

module.exports= {createReport}