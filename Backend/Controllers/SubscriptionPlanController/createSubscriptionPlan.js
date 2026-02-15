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
    // const createSubscriptionPlan = await subscriptionPlanModel.create({})
    console.log('You Can Register it')

} catch (error) {
    console.log("Error in Create Subscription ")
    return res.status(400).json({message:"Error in Create Subscription"})
}
}

module.exports = {createSubscriptionPlan}