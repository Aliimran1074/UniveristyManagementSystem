const { checkGenerateTable } = require('../Controllers/TimeTableController/createAutoTimeTable.controller')
// const { timeTableCreation } = require('../Controllers/TimeTableController/timeTable.controller')

const router = require('express').Router()

// router.route('/createTimeTable/:departmentId').post(timeTableCreation)
router.route('/createNewTimeTable').post(checkGenerateTable)
module.exports=router