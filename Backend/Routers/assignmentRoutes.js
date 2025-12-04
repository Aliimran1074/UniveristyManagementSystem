const { createAssignment, assignmentFileCreation, assignmentQueueCalling } = require('../Controllers/AssesmentController/assignment.controller')

const router = require('express').Router()

router.route('/createAssignment').post(createAssignment)
router.route('/fileCreation').get(assignmentFileCreation)
router.route('/assignmentQueue').get(assignmentQueueCalling)

module.exports=router