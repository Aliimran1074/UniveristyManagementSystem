const instituteModel = require("../../Models/InstituteBatchesClasses/Institute.model")


const instituteCreation  = async (req,res)=>{
try {
    const {instituteName,scope,address,contactNo}=req.body
    const createInstitute= await instituteModel.create({name:instituteName,scope,address,contactNo})

 
    if(!createInstitute)  return res.status(400).json({message:"Institute Not Created"})
    console.log("Institute Created Successfully")
    return res.status(200).json({message:"Institute Created Successfully",createInstitute})


    // will work on subscription when start working on superadmin 

} catch (error) {
    console.log("Issue in Institute Creation Function",error)
    return res.status(404).json({message:"Issue in Institute Creation Function",error})   
}

}


module.exports= {instituteCreation}