const { createReport, individualInstituteReportMonthlyReport } = require('../Controllers/SuperAdminReportController/superAdmin.report.controller')

const router = require('express').Router()


router.route('/createMonthlyReport').post(createReport)
router.route('/monthlyReportOfIndividualInstitute').post(individualInstituteReportMonthlyReport)

module.exports = router