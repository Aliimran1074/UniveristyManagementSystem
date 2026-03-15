const { autoCreationByInput } = require('../Controllers/InstituteAdminController/automaticCreationController')
const { instituteCreation, getInstituteInfo } = require('../Controllers/InstituteAdminController/instituteCreationController')

const router = require('express').Router()

router.route('/instituteCreation').post(instituteCreation)
router.route('/autoInstituteStructureCreation').post(autoCreationByInput)
router.route('/getInstituteInfo').get(getInstituteInfo)
module.exports = router