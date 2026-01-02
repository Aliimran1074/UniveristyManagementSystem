// in this file we will create batches semester class on given input by institute admin just like he wants to create 10 classes each class with 2 sections by using instituteStructureSchema
const instituteModel = require('../../Models/InstituteBatchesClasses/Institute.model')
const instituteStructureModel= require('../../Models/InstituteBatchesClasses/instituteStructure.model')
const autoCreationByInput = async(req,res)=>{
    try {
        const {instituteId,noOfSemester,noOfDepartments,noOfSections,noOfClasses}=req.body
        // checking scope 
        console.log("This is Institute Id",instituteId)
        const checkScope= await instituteModel.findById(instituteId).select('scope')
        if(!checkScope){
            console.log("Sorry we couldn't Find Institute with this ID")
            return res.status(400).json({message:"Sorry we couldn't find institute with this Id"})
        }
// check already structure exist or not
        const checkInstituteInStructureModel= await instituteStructureModel.find({instituteId:instituteId})

        if(checkInstituteInStructureModel){
            console.log("Institute Found In Structure Model")
            return res.status(200).json({message:"Institute Structure Already Set ,If you want to modify Please Use Modification Function"})
        }
        // console.log("Instititute Found in Structure Model , Do you Want to Modify",checkInstituteInStructureModel)
        // return res.status(200).json({message:'Institute Found in Structure Model'})
        const scope = checkScope.scope
        
        if(scope =="Institute"){

            console.log('No of Departments',noOfDepartments)
            const createInstituteStructure = await instituteStructureModel.create({instituteId:instituteId,noOfSemester,noOfClasses,noOfDepartments,noOfSections}) 
        
        if(!createInstituteStructure){
            console.log("Institute Not Created Yet")
            return res.status(400).json({message:"Institute Not Created Yet or issue in Creating Institute"})
        }
        console.log('Institute Created Successfully',createInstituteStructure)
        return res.status(200).json({message:"Institute Structure Created Successfully"})
        
        }
        else if(scope=="Batch"){
            const createBatchStructure = await instituteStructureModel.create({instituteId,noOfClasses,noOfDepartments})
            if(!createBatchStructure){
                console.log("Batch Not Created Yet")
                return res.status(400).json({message:"Batch not Created Yet or issue in Creating Batch"})
            }
            console.log("Batch Created Successfully")
            return res.status(200).json({message:"Batch Structure Created Successfully"})
        }
        else{
                        const createClassStructure = await instituteStructureModel.create({instituteId})
            if(!createClassStructure){
                console.log("Class Not Created Yet")
                return res.status(400).json({message:"Class not Created Yet or issue in Creating Class"})
            }
            console.log("Class Created Successfully")
            return res.status(200).json({message:"Class Structure Created Successfully"})
        }   
        // return res.status(200).json({message:"This is CheckScope",checkScope})

    
    } catch (error) {
        console.log("Issue in Auto Creation Function",error)
        return res.status(404).json({message:"Issue in Auto Creation Function",error})
    }
}


module.exports= {autoCreationByInput}