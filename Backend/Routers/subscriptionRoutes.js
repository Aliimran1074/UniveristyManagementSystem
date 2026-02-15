const { createSubscriptionPlan, updateSubscriptionPlan, deleteSubscription } = require('../Controllers/SubscriptionPlanController/createSubscriptionPlan')

const router = require('express').Router()

router.route('/createSubscriptionPlan').post(createSubscriptionPlan)
router.route('/updateSubscriptionPlan').put(updateSubscriptionPlan)
router.route('/deleteSubscriptionPlan').delete(deleteSubscription)
module.exports = router