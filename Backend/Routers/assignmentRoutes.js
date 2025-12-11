const { createAssignment, assignmentFileCreation, assignmentQueueCalling, createAutoAssignmentByUploadingFile, getAssignmentData, checking, createAutoAssignmentByGivingFile } = require('../Controllers/AssesmentController/assignment.controller')
const { uploadforAssessment } = require('../Multer/multer')

const router = require('express').Router()
// 
router.route('/createAssignment').post(createAssignment)
router.route('/fileCreation').get(assignmentFileCreation)
router.route('/assignmentQueue').get(assignmentQueueCalling)    
// router.route('/createAssignmentUsingPdf').post(createAutoAssignmentByGivingFile)
router.post('/getData', uploadforAssessment, createAutoAssignmentByGivingFile)
router.route('/checking').post(checking)
module.exports=router