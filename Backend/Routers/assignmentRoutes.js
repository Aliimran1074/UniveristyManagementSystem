const { createAssignment, assignmentFileCreation } = require('../Controllers/AssesmentController/assignment.controller')

const router = require('express').Router()

router.route('/createAssignment').post(createAssignment)
router.route('/fileCreation').get(assignmentFileCreation)

module.exports=router