const { increaseQuizUsage, increaseAssignmentUsage, checkAIUsage } = require('../Controllers/AIUsageTestingFolder/DummyTesting')

const router = require('express').Router()

router.route('/quizCountIncrement').post(increaseQuizUsage)
router.route('/assignmentCountIncrement').post(increaseAssignmentUsage)
router.route('/getAiUsage').get(checkAIUsage)

module.exports= router