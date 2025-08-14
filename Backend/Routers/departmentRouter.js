const router = require('express').Router()
const {departmentCreation, updateDepartment, departmentDeletion} = require('../Controllers/DepartmentController/department.controller')

router.route('/departmentCreation').post(departmentCreation)
router.route('/departmentUpdation/:id').put(updateDepartment)
router.route('/departmentDeletion').delete(departmentDeletion)
module.exports = router