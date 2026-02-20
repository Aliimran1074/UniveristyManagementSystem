const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model")
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model.js")
const { subscriptionPlanModel } = require("../../Models/SuperAdminModels/subscriptionsPlan.model.js")


const instituteCreation = async (req, res) => {
    try {
        const { instituteName, address, contactNo, subscriptionPlanId } = req.body

        // check institute already exist by name 
        const checkInstitute = await instituteModel.findOne({ name: instituteName })
        if (checkInstitute) {
            console.log("Institute Already Exist", checkInstitute)
            return res.status(201).json({ message: 'Institute Already Exist', checkInstitute })
        }

        const createInstitute = await instituteModel.create({ name: instituteName, address, contactNo })
       
        if (!createInstitute) return res.status(400).json({ message: "Institute Not Created" })
        console.log("Institute Created Successfully")

        const getSubscriptionDetails = await subscriptionPlanModel.findById(subscriptionPlanId)
            const startDate = Date.now()
            // console.log("Start Date :", startDate)
            const getDuration = getSubscriptionDetails.durationDays
            // console.log('Duration :', getDuration)

            // convert duration to milisecond
            const miliSecondDuration = getDuration * 24 * 60 * 60 * 1000

            const endDateInMiliSecond = startDate + miliSecondDuration

            // const readableStartDate = new Date(startDate).toLocaleDateString()
            // const readableEndDate = new Date(endDateInMiliSecond).toLocaleDateString()
            // console.log("Start Date :", readableStartDate)
            // console.log("End Date :", readableEndDate)
      
            //here subscription work will done
        const getInstituteId = createInstitute._id
        // console.log('Institute Id :', getInstituteId)

        const getSubscriptionPlanId= getSubscriptionDetails._id
        const getScopeOfSubscription = getSubscriptionDetails.type
        
        const createSubscriptionOfIndividualInstitute= await subscriptionModel.create({instituteId:getInstituteId,planId:getSubscriptionPlanId,scopeType:getScopeOfSubscription,startDate:startDate,endDate:endDateInMiliSecond})
        
        if(!createSubscriptionOfIndividualInstitute){
            console.log("Issue in Creating Subscription of Individual Institute")
            return res.status(400).json({message:"Issue in Creating Subscription of Individual Institute"})
        }

        console.log("Institute Created Successfully and Subscription Also Done")

        return res.status(200).json({ message: "Institute Created and Subscription Done Succesfully", createInstitute,createSubscriptionOfIndividualInstitute })


        // will work on subscription when start working on superadmin 

    } catch (error) {
        console.log("Issue in Institute Creation Function", error)
        return res.status(404).json({ message: "Issue in Institute Creation Function", error })
    }

}


module.exports = { instituteCreation }