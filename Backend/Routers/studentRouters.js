const router = require ('express').Router()
const {studentRegistration,getAStudentByCnic,getAStudentById,updateDataUsingCnic,updateDataUsingId, deleteStudent, newStudentRegistration}= require('../Controllers/studentController/Student.controller')

router.route('/studentRegistration').post(studentRegistration)
router.route('/getStudentByCnicNo').get(getAStudentByCnic)
router.route('/getStudentById/:studentId').get(getAStudentById)
router.route('/updateUsingId/:id').put(updateDataUsingId)
router.route('/updateUsingCnic/:cnicNo').put(updateDataUsingCnic)
router.route('/deleteStudent').delete(deleteStudent)
router.route('/newStudentRegistration').post(newStudentRegistration)
module.exports=router