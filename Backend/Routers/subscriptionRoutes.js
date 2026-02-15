const { createSubscriptionPlan } = require('../Controllers/SubscriptionPlanController/createSubscriptionPlan')

const router = require('express').Router()

router.route('/createSubscriptionPlan').post(createSubscriptionPlan)


module.exports = router