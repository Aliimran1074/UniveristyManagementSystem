const router= require('express').Router()
const { courseCreation, updationInCourse, courseDeletion } = require('../Controllers/courseConroller/course.controller')


router.route('/courseCreation').post(courseCreation)
router.route('/updateCourse/:id').put(updationInCourse)
router.route('/courseDeletion').delete(courseDeletion)
module.exports=router