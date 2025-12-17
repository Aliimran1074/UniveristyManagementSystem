const { quizChecker } = require('../Controllers/AssesmentController/QuizController/quizChecker')
const { uploadforAssessment } = require('../Multer/multer')

const router = require('express').Router()

router.post('/quizChecker',uploadforAssessment,quizChecker)

module.exports=router