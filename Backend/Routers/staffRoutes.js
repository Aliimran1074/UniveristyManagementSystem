const router = require('express').Router()

const { staffRegistration, getAstaffByCnic, getAstaffById, updateDataUsingId, updateDataUsingCnic, deletestaff } = require('../Controllers/StaffController/staff.controller')



router.route('/staffRegistration').post(staffRegistration)
router.route('/getStaffByCnic').get(getAstaffByCnic)
router.route('/getStaffById/:staffId').get(getAstaffById)
router.route('/updateStaffUsingId/:id').put(updateDataUsingId)
router.route('/updateStaffUsingCnic/:cnicNo').put(updateDataUsingCnic)
router.route('/deleteStaff/:id').delete(deletestaff)
module.exports= router