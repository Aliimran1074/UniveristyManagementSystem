const {acceptAppointment, RejectAppointment,rejectAppointment}= require('../Controllers/TimeTableController/Counselling Agent/teacherHandlingCounsellingRequest')
const router = require('express').Router()

router.route('/acceptAppointment').post(acceptAppointment)
router.route('/rejectAppointment').post(rejectAppointment)

module.exports= router
