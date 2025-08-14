const department = require('../../Models/Department/deparment.model')

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

module.exports= {departmentCreation,departmentDeletion,updateDepartment}