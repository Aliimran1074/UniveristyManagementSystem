const studentModel = require('../Models/UserModels/students.models')
const counter= require('../Models/Counter/counter.model')
const QRCode = require('qrcode')
// const { counterGetter } = require('./counter.controller')
const studentRegistration= async(req,res)=>{
    try {
        const {name,personalEmail,department,contactNo,cnicNo} = req.body
        // const {cnicNo}=req.body
        console.log("Cnic No:",cnicNo)
        const getYear = new Date().getFullYear()
        let sequenceNo = ''
        const checkRegistrationByCNIC = await studentModel.findOne({cnicNo:cnicNo})
        if(checkRegistrationByCNIC){
            console.log("Student Already Registered")
            return res.status(401).json({message:'Student Already Registered'})
        }
        // if(!checkRegistrationByCNIC){
        //     console.log("No student avaialable")
        //     return res.status(400).json({message:"No student Avaiable"})
        // }
        const customId= 'abc'                       //abc is custom id which will form by default
        const getCounter = await counter.findOne({customid:customId})
        // console.log(getCounter)
        sequenceNo = getCounter.sequence      
        console.log('Sequence No')
        // return res.status(200).json({message:'Sequence no ', sequenceNo})
        const createStudent= await studentModel.create({name:name,personalEmail:personalEmail,contactNo:contactNo,cnicNo:cnicNo,department:department,password:password})
        if(!createStudent){
            console.log("Student Not Created ")
            return res.status(400).json({message:"Student Not Created"})
        }
        console.log('Student Created Successfully')
        return res.status(200).json({message:"Student Created Successfully",createStudent})
        
} catch (error) {
    console.log("error in function",error)
    return res.status(404).json({message:"Issue in Function of Registration",error})
}
}

module.exports= {studentRegistration}