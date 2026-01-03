const department = require('../../Models/Department/deparment.model')

const departmentCreation= async(req,res)=>{
try {
    const {name,instituteId} = req.body
    let nameToUpperCase = name.toUpperCase()
    console.log(nameToUpperCase)
    const checkDepartmentExistanceByName = await department.find({name:nameToUpperCase})
    // console.log(checkDepartmentExistanceByName)
    if(checkDepartmentExistanceByName.length>0){
        console.log("Department Already Exist ")
        return res.status(400).json({message:"Department Already Exist",checkDepartmentExistanceByName})
    }
    const departmentCreation = await department.create({name:nameToUpperCase,instituteId:instituteId})
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

const departmentDeletion= async(req,res)=>{
try {
       const {id} = req.body
    const deleteDepartment = await department.deleteOne({_id:id})
    if(!deleteDepartment){
        console.log('Not able to delete Departement')
        return res.status(401).json({message:'Department not deleted'})
    }
    console.log('Department Deleted Successfully')
    return res.status(200).json({message:"Department Deleted Successfully",deleteDepartment})
    } catch (error) {
    console.log('Error in Department deletion',error)
    return res.status(404).json({message:"Error in Department function",error})
}
}

const updateDepartment = async (req,res)=>{
    try {
        const {id} = req.params
        const data = req.body
        const updatedData = await department.findByIdAndUpdate(id,data,{new:true})
        if(!updatedData){
            console.log("Data not updated")
            return res.status(401).json({message:"Data not Updated"})
        }
        console.log("Data updated Successfully")
        return res.status(200).json({message:"Data Updated Successfully",updatedData})
    } catch (error) {
        console.log("Error in Data updation function",error)
        return res.status(404).json({message:"Error in Data Updation Function",error})
    }
}

const getAllDepartment = async(req,res)=>{
    try {
        const gettingAllDepartment = await department.find()
        if(!gettingAllDepartment){
            console.log("Issue in Getting All Department")
            return res.status(404).json({message:"Issue in Getting All Department"})
        }
        console.log('Department Found Successfully')
        return res.status(200).json({message:"Departments Found Successfully",gettingAllDepartment})
    } catch (error) {
        console.log("Error in Getting All Department",error)
        return res.status(400).json({message:"Error in Getting All Department",error})
    }
}

const getAllDepartmentOfSameInstitute= async(req,res)=>{
    try{
        const {instituteId}=req.body
        const getAllDepartment= await department.find({instituteId:instituteId})
        if(!getAllDepartment){
            console.log("Issue in Getting All Department using instituteId")
            return res.status(400).json({message:'Issue in Getting All Department using instituteId'})
        }
        console.log("All Department Found",getAllDepartment)
        return res.status(200).json({message:"All Department Found"})
    }
catch(error){
    console.log("Error in Function of All Department Found Using Institute Id",error)
    return res.status(404).json({message:"Error in Function of All Department Found Using Institute Id"})

}
}
module.exports= {departmentCreation,departmentDeletion,updateDepartment,getAllDepartment,getAllDepartmentOfSameInstitute}