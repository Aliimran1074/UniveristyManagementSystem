const { timeTableCreation } = require('../Controllers/TimeTableController/timeTable.controller')

const router = require('express').Router()

router.route('/createTimeTable/:departmentId').post(timeTableCreation)

module.exports=router