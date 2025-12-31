// in this file we will create batches semester class on given input by institute admin just like he wants to create 10 classes each class with 2 sections by using instituteStructureSchema
const instituteModel = require('../../Models/InstituteBatchesClasses/Institute.model')
const instituteStructureModel = require('../../Models/InstituteBatchesClasses/instituteStructure.model')

const autoCreationByInput = async(req,res)=>{
    try {
        const {instituteId,noOfSemester,noOfDepartment,noOfSections,noOfClasses}=req.body
        // checking scope 
        console.log("This is Institute Id",instituteId)
        const checkScope= await instituteModel.findById(instituteId).select('scope')
        if(!checkScope){
            console.log("Sorry we couldn't Find Institute with this ID")
            return res.status(400).json({message:"Sorry we couldn't find institute with this Id"})
        }

        const scope = checkScope.scope
        
        if(scope =="Institute"){
            const createInstituteStructure = await instituteStructureModel({instituteId:instituteId,noOfSemester,noOfClasses,noOfDepartment,noOfSections}) 
        
        if(!createInstituteStructure){
            console.log("Institute Not Created Yet")
            return res.status(400).json({message:"Institute Not Created Yet or issue in Creating Institute"})
        }
        console.log('Institute Created Successfully')
        return res.status(200).json({message:"Institute Created Successfully"})
        
        }
        else if(scope=="Batch"){

        }
        else{

        }
        // return res.status(200).json({message:"This is CheckScope",checkScope})

    
    } catch (error) {
        console.log("Issue in Auto Creation Function",error)
        return res.status(404).json({message:"Issue in Auto Creation Function",error})
    }
}


module.exports= {autoCreationByInput}