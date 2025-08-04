const router = require ('express').Router()
const {studentRegistration}= require('../Controllers/Student.controller')

router.route('/studentRegistration').post(studentRegistration)

module.exports=router