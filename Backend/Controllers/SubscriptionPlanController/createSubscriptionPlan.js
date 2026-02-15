const { subscriptionPlanModel } = require("../../Models/SuperAdminModels/subscriptionsPlan.model")

const createSubscriptionPlan= async(req,res)=>{
try {
    const {subscriptionName,description,type,aiFeatures,manualFeatures,maxDepartments,maxClasses,price,durationDays} =req.body
    
    // check subscription By Name
    const checkSubscription= await subscriptionPlanModel.findOne({subscriptionName:subscriptionName})
    if(checkSubscription){
        console.log("Subscription Found")
        return res.status(200).json({message:"This Subscription Plan Already Exist"})
    }
    const dataObject= {subscriptionName,description,type,aiFeatures,manualFeatures,maxDepartments,maxClasses,price,durationDays}
    console.log('You Can Register it')
    const createSubscriptionPlan = await subscriptionPlanModel.create(dataObject)

    if(!createSubscriptionPlan){
        console.log("Subscription Planned not created Successfully")
        return res.status(404).json({message:'Subscription Planned not Created Successfully'})
    }
    console.log("Subscription Planed Created Successfully",createSubscriptionPlan)
    return res.status(200).json({message:"Subscription Plan Created Successfully",createSubscriptionPlan})

} catch (error) {
    console.log("Error in Create Subscription ")
    return res.status(400).json({message:"Error in Create Subscription"})
}
}

const updateSubscriptionPlan =async (req,res)=>{
try{
    const data = req.body
    console.log(data)
    const id= data.id
    //check existance of subscription plan
    const checkSubscriptionPlan = await subscriptionPlanModel.findById(id)
    if(!checkSubscriptionPlan){
        console.log('No Subscription Plan with this id exist')
        return res.status(400).json({message:"No Subscription Plan with this id exist"})
    }
    const updateSubscriptionPlan = await subscriptionPlanModel.findOneAndUpdate({_id:id},{data},{new:true})
    
    if(!updateSubscriptionPlan) return res.status(400).json({message:"Subscription Plan not Updated Successfully"})
    
    console.log("Subscription Plan updated Successfully")
    return res.status(200).json({message:"Subscription Plan updated Successfully"})

}
catch(error){
    console.log("Error in Update Subscription Plan",error)
    return res.status(404).json({message:"Error in Update Subscription Plan"})
}
}

const deleteSubscription=async(req,res)=>{
    try {
    const {id} = req.body
     const checkSubscriptionPlan = await subscriptionPlanModel.findById(id)
    if(!checkSubscriptionPlan){
        console.log('No Subscription Plan with this id exist')
        return res.status(400).json({message:"No Subscription Plan with this id exist"})
    }
    const deleteSubscriptionById= await subscriptionPlanModel.findByIdAndDelete(id)
    if(!deleteSubscriptionById) return res.status(400).json({message:"Subscription Plan not Deleted"})
    console.log("Subscription Plan Deleted Successfully",deleteSubscriptionById)
    return res.status(200).json({message:"Subscription Plan Deleted Successfully",deleteSubscriptionById})

    } catch (error) {
        console.log("Error in Delete Subscription Function",error)
        return res.status(400).json({message:"Error in Delete Subscription Function",error})
    }
}

module.exports = {createSubscriptionPlan,updateSubscriptionPlan,deleteSubscription}