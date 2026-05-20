const { default: axios } = require("axios")
const assignmentModel = require("../../Models/Assignment/assignment.model")
const assignmentUploadingModel = require("../../Models/Assignment/assignmentUploading.model")

const assignmentCheckerFunction = async(req,res)=>{
    try{

        // questions as string bhejne hai or assignment upload file bhejni hai Ai ko
        const {uploadAssignmentId} = req.body
        const isUploadAssignmentExist = await assignmentUploadingModel.findById(uploadAssignmentId)
        if(!isUploadAssignmentExist){
            console.log("Assignment Uploading not Exist ")
            return res.status(400).json({message:"Assignment Uploading not Exist"})
        }

        const assigmentId = isUploadAssignmentExist.assigmnetId
        const getAssignmentQuestions = await assignmentModel.findById(assigmentId).select(assignmentQuestions)

        const getUploadFileLink = isUploadAssignmentExist.uploadedFile

        // const getResponseFromAi = await axios.post()
    }
    catch(error){

    }
}