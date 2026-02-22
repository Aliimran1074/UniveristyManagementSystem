// We will here how to create superadmin report

const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model")
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")

const createReport = async(req,res)=>{
    try{
        const {instituteId,subscriptionId,reportMonth,reportYear}= req.body
        const instituteInformation = await instituteModel.findById(instituteId)
        
        if(!instituteInformation){
            console.log("Institute Info :",instituteInformation)
            return res.status(200).json({message:"Institute not Found "})
        }

        // here we will calcualte report month if current month is feburaray obviously it will generate report of Jan
        const month = Date.now()
        
        // institute Name for report
        const instituteName = instituteInformation.name
        const instituteContactNo = instituteInformation.contactNo
        
        const subscriptionPlan =await subscriptionModel.findById(subscriptionId)
        if(!subscriptionPlan){
            console.log("Subscription not Found")
            return res.status(200).json({message:"Subscription not Found"})
        }
        return res.status(200).json({message:"Subscription Found",subscriptionPlan})


        // Now to work on snapshot and other calculation  20/2/26
        

        // return res.status(400).json({message:'Sorry we are unable to find Institute Information'})
    }
    catch(error){
        console.log("Error in Create Report Function",error)
        return res.status(404).json({message:"Error in Create Report Function",error})
    }
}

module.exports= {createReport}