const { createSubscriptionPlan, updateSubscriptionPlan, deleteSubscription, getAllSubscription, getAllSubscriptionPlanDetails } = require('../Controllers/SubscriptionPlanController/createSubscriptionPlan')

const router = require('express').Router()

router.route('/createSubscriptionPlan').post(createSubscriptionPlan)
router.route('/updateSubscriptionPlan').put(updateSubscriptionPlan)
router.route('/deleteSubscriptionPlan').delete(deleteSubscription)
router.route('/getAllSubscription').get(getAllSubscription)
router.route('/getAllSubscriptionPlanDetails').get(getAllSubscriptionPlanDetails)

module.exports = router