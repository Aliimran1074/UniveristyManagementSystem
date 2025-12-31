const { autoCreationByInput } = require('../Controllers/InstituteAdminController/automaticCreationController')
const { instituteCreation } = require('../Controllers/InstituteAdminController/instituteCreationController')

const router = require('express').Router()

router.route('/instituteCreation').post(instituteCreation)
router.route('/autoInstituteStructureCreation').post(autoCreationByInput)
module.exports = router