const department = require('../Models/Department/deparment.model')

const departmentCreation= async(req,res)=>{
try {
    const {name} = req.body
    const departmentCreation = await department.create({name:name})
    if(!departmentCreation){
        console.log("Department Creation Failed")
        return res.status(401).json({message:"Issue in Creating Deparment"})
    }
    console.log("Department Created Successfully")
    return res.status(200).json({message:"Department Created Successfully",})    
} catch (error) {
    console.log("Issue in creating Department")
    return res.status(404).json({message:"Error in Creating Department",error})
}
}

module.exports= departmentCreation