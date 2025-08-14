const router= require('express').Router()
const { courseCreation } = require('../Controllers/course.controller')




router.route('/courseCreation').post(courseCreation)

module.exports=router