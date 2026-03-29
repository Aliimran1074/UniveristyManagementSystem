const router= require('express').Router()
const { courseCreation, updationInCourse, courseDeletion, getCompleteCourseUpdate, assignInstructorToCourse } = require('../Controllers/courseConroller/course.controller')
const { courseEnrollment } = require('../Controllers/courseConroller/course.enrollment.controller')


router.route('/courseCreation').post(courseCreation)
router.route('/updateCourse/:id').put(updationInCourse)
router.route('/courseDeletion').delete(courseDeletion)
router.route('/courseEnrollment').post(courseEnrollment)
router.route('/getCourseInfo').get(getCompleteCourseUpdate)
router.route('/assignInstructorToCourse').put(assignInstructorToCourse)
module.exports=router