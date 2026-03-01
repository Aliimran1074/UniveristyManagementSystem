const { manualQuizCreation } = require('../Controllers/AssesmentController/QuizController/quiz.controller')
const { quizChecker } = require('../Controllers/AssesmentController/QuizController/quizChecker')
const { uploadforAssessment } = require('../Multer/multer')

const router = require('express').Router()

router.post('/quizChecker',uploadforAssessment,quizChecker)
router.post('/manualQuizCreation',uploadforAssessment,manualQuizCreation)
module.exports=router