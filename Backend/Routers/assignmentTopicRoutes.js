const assignmentTopicHandling = require('../Controllers/AssignmentTopicsController/assignment.topics')
const router= require('express').Router()


router.route('/createTopic').post(assignmentTopicHandling)

module.exports= router