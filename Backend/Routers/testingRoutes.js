const { increaseQuizUsage } = require('../Controllers/AIUsageTestingFolder/DummyTesting')

const router = require('express').Router()

router.route('/quizCountIncrement').post(increaseQuizUsage)

module.exports= router