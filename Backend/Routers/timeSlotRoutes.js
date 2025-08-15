
const router= require('express').Router()
const { timeSlotCreation, updationInTimeSlots, deleteTimeSlot } = require('../Controllers/TimeSlotController/timeSlotController')

router.route('/timeSlotCreation').post(timeSlotCreation)
router.route('/timeSlotUpdation/:id').put(updationInTimeSlots)
router.route('/deleteTimeSlot').delete(deleteTimeSlot)

module.exports=router