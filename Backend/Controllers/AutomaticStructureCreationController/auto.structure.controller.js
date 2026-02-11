const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model")

const automaticStructureCreation=async(req,res)=>{
    try {
        const {instituteId}= req.body
        // check type of subscription
        const institute = await instituteModel.findById(instituteId)
        if(!institute){
            console.log("Sorry you dont have any institute with this Id")
            return res.status(400).json({message:"Sorry you dont have any institute with this Id"})
        }

        const subscriptionType = institute.scope
        console.log(subscriptionType)
    }
     catch (error) {
        console.log("Error in Automatic Structure Creation Function",error)
        return res.status(404).json({message:"Error in Automatic Structure Creation",error})
    }

}

module.exports ={automaticStructureCreation}