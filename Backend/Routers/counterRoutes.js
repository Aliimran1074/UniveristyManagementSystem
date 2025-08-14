const router= require('express').Router()
const {createCounter,counterGetter,updateCounter} = require('../Controllers/CounterController/counter.controller')

router.route('/counterCreation').post(createCounter)
router.route('/counterGetter').get(counterGetter)
router.route('/updateCounter').put(updateCounter)

module.exports= router