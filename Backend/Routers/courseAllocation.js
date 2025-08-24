const router = require('express').Router()
const {courseAllocation, selectiveTeacherCourses, getNonSelectedCoursesOfParticularDepartment}= require('../Controllers/courseConroller/courseAllocation')

router.route('/courseAllocation/:selectorId').post(courseAllocation)
router.route('/getUnselectedCourses/:departmentId').get(getNonSelectedCoursesOfParticularDepartment)
router.route('/coursesTeachedBySelectedTeacher').post(selectiveTeacherCourses)
module.exports=router