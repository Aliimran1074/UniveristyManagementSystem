const { manualQuizCreation, manualQuizCreationByPdfUploading, quizUploading, quizManualMarksUploadingByTeacher } = require('../Controllers/AssesmentController/QuizController/quiz.controller')
const { quizChecker, quizCheckerFunctionUsingAI } = require('../Controllers/AssesmentController/QuizController/quizChecker')
const { functionOfSelectingOfQuizTypeForCreation } = require('../Controllers/AssesmentController/QuizController/quizHandlingUsingAI')
const { uploadforAssessment } = require('../Multer/multer')

const router = require('express').Router()

router.post('/quizChecker',uploadforAssessment,quizChecker)
router.post('/manualQuizCreation',uploadforAssessment,manualQuizCreation)
router.post('/manualQuizCreationByUploadingPdf',uploadforAssessment,manualQuizCreationByPdfUploading)
router.post('/uploadingQuiz',uploadforAssessment,quizUploading)
router.put('/manualQuizMarksUploading',quizManualMarksUploadingByTeacher)
router.post('/quizCreationUsingAI',functionOfSelectingOfQuizTypeForCreation)
router.post('/quizCheckerUsingAI',quizCheckerFunctionUsingAI)
module.exports=router