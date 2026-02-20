const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")

const increaseAssignmentUsage = async(req,res)=>{
try {
    const {instituteId,subscriptionId}= req.body
} catch (error) {
    
}

}

const increaseQuizUsage = async(req,res)=>{
try {
    const {subscriptionId}= req.body
    const getSubscriptionDetails = await subscriptionModel.findById(subscriptionId)
    const getQuizUsage = getSubscriptionDetails.aiUsage.quizGeneratorUsed
    // console.log(getAIUsageStatus)
    const increment = getQuizUsage+1
      getSubscriptionDetails.aiUsage.quizGeneratorUsed=increment

    getSubscriptionDetails.save()
    console.log(increment)
    return res.status(200).json({message:"This is AI Usage",getSubscriptionDetails})
} catch (error) {
    console.log("Issue in Quiz Increase Function",error)
    return res.status(400).json({message:"Issue in Quiz Increase Function",error})
}

}
const checkAIUsage= async(req,res)=>{
    try {
        const {subscriptionId}= req.body
    } catch (error) {
        
    }
}

module.exports = {increaseQuizUsage}