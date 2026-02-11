const { subscriptionPlanModel } = require("../../Models/SuperAdminModels/subscriptionsPlan.model")

const createSubscriptionPlan= async(req,res)=>{
try {
    const {subscriptionName,description} =req.body
    
    // check subscription By Name
    const checkSubscription= await subscriptionPlanModel.findOne({subscriptionName:subscriptionName})
    if(checkSubscription){
        console.log("Subscription Found")
        return res.status(200).json({message:"This Subscription Plan Alreadu Exist"})
    }
    console.log('You Can Register it')

} catch (error) {
    
}
}