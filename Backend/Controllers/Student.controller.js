const studentModel = require('../Models/UserModels/students.models')
const counter= require('../Models/Counter/counter.model')
const QRCode = require('qrcode')
const { counterGetter } = require('./counter.controller')
const studentRegistration= async(req,res)=>{

    try {
        const {name,personalEmail,department,contactNo,cnicNo} = req.body
        const getYear = new Date.getFullYear()
        const sequenceNo = ''
        const checkRegistrationByCNIC = studentModel.findOne({cnicNo:cnicNo})
        if(checkRegistrationByCNIC){
            console.log("Student Already Registered")
            return res.status(401).json({message:'Student Already Registered'})
        }
        const customId= 'abc'
        const getCounter = await counter.findOne({customId:customId})
        if(getCounter){
            sequenceNo = getCounter.sequence      
        }

        // const createStudent=
        
} catch (error) {
    
}
}