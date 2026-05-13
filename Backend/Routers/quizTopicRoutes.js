const router = require('express').Router()
const {quizTopicHandling} = require('../Controllers/AssesmentController/QuizController/Quiz Topic Controller/quiz.topics')


router.route('/quizInput').post(quizTopicHandling)


module.exports= router