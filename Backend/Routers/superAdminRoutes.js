const { createReport } = require('../Controllers/SuperAdminReportController/superAdmin.report.controller')

const router = require('express').Router()


router.route('/createMonthlyReport').post(createReport)

module.exports = router