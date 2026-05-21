const { default: axios } = require("axios")
const assignmentModel = require("../../Models/Assignment/assignment.model")
const assignmentUploadingModel = require("../../Models/Assignment/assignmentUploading.model")
const FormData= require('form-data')
const studentModel = require("../../Models/UserModels/students.models")
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
        const studentId = isUploadAssignmentExist.studentId
        const getStudentName = await studentModel.findById(studentId).select(name)
        const getAssignmentQuestions = await assignmentModel.findById(assigmentId).select(assignmentQuestions)

        const getUploadFileLink = isUploadAssignmentExist.uploadedFile
        const formData =new FormData()
        const fileResponse = await axios.get(getUploadFileLink,{responseType:'arraybuffer'})

        const pdfBuffer = Buffer.from(fileResponse.data)

        // one student can upload more than one assignment according to this logic student uploading file name always same and cause overwrite
        formData.append('file',pdfBuffer,{
            filename:`${getStudentName} assignment File ${Date.now()}`,
            contentType:'application/pdf'
        })

        formData.append('questions',JSON.stringify(getAssignmentQuestions))

        const getResponseFromAi = await axios.post()
        // https://huggingface-configuration.vercel.app/assignment/assignmentChecker
    }
    catch(error){

    }
}

const extraFunction = async()=>{
    console.log("Working on Upper Function")
}