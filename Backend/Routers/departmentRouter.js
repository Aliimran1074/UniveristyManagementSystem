const router = require('express').Router()
const {departmentCreation, updateDepartment, departmentDeletion, getAllDepartment} = require('../Controllers/DepartmentController/department.controller')

router.route('/departmentCreation').post(departmentCreation)
router.route('/departmentUpdation/:id').put(updateDepartment)
router.route('/departmentDeletion').delete(departmentDeletion)
router.route('/getDepartments').get(getAllDepartment)
module.exports = router