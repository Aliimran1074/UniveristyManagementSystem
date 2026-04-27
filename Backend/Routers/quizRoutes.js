const { manualQuizCreation, manualQuizCreationByPdfUploading, quizUploading, quizManualMarksUploadingByTeacher } = require('../Controllers/AssesmentController/QuizController/quiz.controller')
const { quizChecker } = require('../Controllers/AssesmentController/QuizController/quizChecker')
const { uploadforAssessment } = require('../Multer/multer')

const router = require('express').Router()

router.post('/quizChecker',uploadforAssessment,quizChecker)
router.post('/manualQuizCreation',uploadforAssessment,manualQuizCreation)
router.post('/manualQuizCreationByUploadingPdf',uploadforAssessment,manualQuizCreationByPdfUploading)
router.post('/uploadingQuiz',uploadforAssessment,quizUploading)
router.post('/manualQuizMarksUploading',quizManualMarksUploadingByTeacher)


module.exports=router