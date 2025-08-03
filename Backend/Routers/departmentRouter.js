const router = require('express').Router()
const departmentCreation = require('../Controllers/department.controller')

router.route('/departmentCreation').post(departmentCreation)

module.exports = router