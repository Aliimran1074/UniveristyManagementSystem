const router= require('express').Router()
const { courseCreation, updationInCourse, courseDeletion } = require('../Controllers/courseConroller/course.controller')
const { courseEnrollment } = require('../Controllers/courseConroller/course.enrollment.controller')


router.route('/courseCreation').post(courseCreation)
router.route('/updateCourse/:id').put(updationInCourse)
router.route('/courseDeletion').delete(courseDeletion)
router.route('/courseEnrollment').post(courseEnrollment)

module.exports=router