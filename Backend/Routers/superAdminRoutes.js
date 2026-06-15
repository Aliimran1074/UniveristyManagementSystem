const { generateSuperAdminMonthlyReport } = require('../Controllers/SuperAdminReportController/mainSuperAdminMonthlyReport.controller')
// const { createReport, individualInstituteReportMonthlyReport } = require('../Controllers/SuperAdminReportController/superAdmin.report.controller')

const { individualInstituteReportMonthlyReport, generateInstituteReportController } = require('../Controllers/SuperAdminReportController/superAdmin.report.controller')
const router = require('express').Router()


// router.route('/createMonthlyReport').post(createReport)
router.route('/monthlyReportOfIndividualInstitute').post(generateInstituteReportController)

// router.route('/monthlyReportOfIndividualInstitute').post(individualInstituteReportMonthlyReport)
router.route('/generateSuperAdminMonthlyReport').get(generateSuperAdminMonthlyReport)
module.exports = router