const { createAssignment, assignmentFileCreation, assignmentQueueCalling, createAutoAssignmentByUploadingFile, getAssignmentData } = require('../Controllers/AssesmentController/assignment.controller')
const { uploadforAssessment } = require('../Multer/multer')

const router = require('express').Router()

router.route('/createAssignment').post(createAssignment)
router.route('/fileCreation').get(assignmentFileCreation)
router.route('/assignmentQueue').get(assignmentQueueCalling)    
router.route('/createAssignmentUsingPdf').post(createAutoAssignmentByUploadingFile)
router.post('/getData', uploadforAssessment, getAssignmentData)

module.exports=router