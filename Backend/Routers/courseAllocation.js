const router = require('express').Router()
const {courseAllocation}= require('../Controllers/courseConroller/courseAllocation')

router.route('/courseAllocation/:selectorId').post(courseAllocation)

module.exports=router