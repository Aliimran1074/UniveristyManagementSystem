const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")

const increaseAssignmentUsage = async(req,res)=>{
try {
    const {subscriptionId}= req.body
    const getSubscriptionDetails = await subscriptionModel.findById(subscriptionId)
    const getAssignmentUsage = getSubscriptionDetails.aiUsage.assignmentGeneratorUsed
    // console.log(getAIUsageStatus)
    const increment = getAssignmentUsage+1
      getSubscriptionDetails.aiUsage.assignmentGeneratorUsed=increment

    getSubscriptionDetails.save()
    console.log(increment)
    return res.status(200).json({message:"This is AI Usage",getSubscriptionDetails})
} catch (error) {
    console.log("Issue in Quiz Increase Function",error)
    return res.status(400).json({message:"Issue in Quiz Increase Function",error})
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
        const getSubscription= await subscriptionModel.findById(subscriptionId)
        if(!getSubscription){
            console.log("Subscription Register not Found")
            return res.status(404).json({message:"Subscription Register not Found"})
        }
        const getAiUsage =getSubscription.aiUsage
        console.log(getAiUsage)
        return res.status(200).json({message:"This is an AI usage of subscription",getAiUsage})
    } catch (error) {
        console.log("Error in Check AI usage",error)
    }
}

module.exports = {increaseQuizUsage,increaseAssignmentUsage,checkAIUsage}