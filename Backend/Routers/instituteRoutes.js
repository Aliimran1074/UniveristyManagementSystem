const { autoCreationByInput } = require('../Controllers/InstituteAdminController/automaticCreationController')
const { instituteCreation, getInstituteInfo, getAllInstituteInfo, allInstituteInfoFunctionForDashboard } = require('../Controllers/InstituteAdminController/instituteCreationController')

const router = require('express').Router()

router.route('/instituteCreation').post(instituteCreation)
router.route('/autoInstituteStructureCreation').post(autoCreationByInput)
router.route('/getInstituteInfo').get(getInstituteInfo) 
router.route('/getAllInstituteInfo').get(getAllInstituteInfo)
router.route('/allInstituteInfo').get(allInstituteInfoFunctionForDashboard)
module.exports = router