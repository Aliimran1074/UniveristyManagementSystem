const studentModel = require('../Models/UserModels/students.models')
const counter= require('../Models/Counter/counter.model')
const studentRegistration= async(req,res)=>{

    try {
        const {name,personalEmail,department,contactNo,cnicNo} = req.body
        const checkRegistrationByCNIC = studentModel.findOne({cnicNo:cnicNo})
        if(checkRegistrationByCNIC){
            console.log("Student Already Registered")
            return res.status(401).json({message:'Student Already Registered'})
        }

        
} catch (error) {
    
}
}