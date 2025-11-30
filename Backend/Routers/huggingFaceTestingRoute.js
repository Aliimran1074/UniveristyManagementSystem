const router= require('express').Router()
const {generateAnswer}= require('../Hugging Face Setup/setup')
// const { classifyText } = require('../Hugging Face Setup/testingFile')

router.route('/testing').post(generateAnswer)
// router.route('/checking').get(classifyText)

module.exports=router 