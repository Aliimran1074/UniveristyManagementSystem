const {teacherDashboardInfo} = require('../Controllers/AggregationFunctions/forTeacherDashboard')
const router = require('express').Router()

router.route('/teacherDashboardInfo/:teacherId').get(teacherDashboardInfo)

module.exports = router