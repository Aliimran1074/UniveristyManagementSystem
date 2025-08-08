const router = require ('express').Router()
const {studentRegistration,getAStudentByCnic,getAStudentById,updateDataUsingCnic,updateDataUsingId}= require('../Controllers/Student.controller')

router.route('/studentRegistration').post(studentRegistration)
router.route('/getStudentByCnicNo').get(getAStudentByCnic)
router.route('/getStudentById/:studentId').get(getAStudentById)
router.route('/updateUsingId/:id').put(updateDataUsingId)
router.route('/updateUsingCnic/:cnicNo').put(updateDataUsingCnic)
module.exports=router