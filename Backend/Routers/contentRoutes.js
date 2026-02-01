const { createManualCourseContent } = require('../Controllers/ContentController/courseContent.controller')
const { uploadforAssessment } = require('../Multer/multer')

const router = require('express').Router()

router.post('/uploadManualContent',uploadforAssessment,createManualCourseContent)

module.exports= router