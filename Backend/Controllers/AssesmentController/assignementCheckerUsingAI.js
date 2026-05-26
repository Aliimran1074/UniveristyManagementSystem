const { default: axios } = require("axios")
const assignmentModel = require("../../Models/Assignment/assignment.model")
const assignmentUploadingModel = require("../../Models/Assignment/assignmentUploading.model")
const FormData= require('form-data')
// const studentModel = require("../../Models/UserModels/students.models")
const studentRegistrationModel = require('../../Models/UserModels/studentRegistration.model')

// const assignmentCheckerFunction = async(req,res)=>{
//     try{
//         // questions as string bhejne hai or assignment upload file bhejni hai Ai ko

//         const {uploadAssignmentId} = req.body
//         console.log("Upload Assignment Id :",uploadAssignmentId)
//         const isUploadAssignmentExist = await assignmentUploadingModel.findById(uploadAssignmentId)
//         if(!isUploadAssignmentExist){
//             console.log("Assignment Uploading not Exist ")
//             return res.status(400).json({message:"Assignment Uploading not Exist"})
//         }

//         const assigmentId = isUploadAssignmentExist.assigmnetId
//         const studentId = isUploadAssignmentExist.studentId
//         // const getStudentName =await studentRegistrationModel 
//         const getStudentName = await studentRegistrationModel.findById(studentId).select('name')
//         const getAssignmentQuestions = await assignmentModel.findById(assigmentId).select('assignmentQuestions')

//         const getUploadFileLink = isUploadAssignmentExist.uploadedFile
//         const formData =new FormData()
//         const fileResponse = await axios.get(getUploadFileLink,{responseType:'arraybuffer'})
//         const pdfBuffer = Buffer.from(fileResponse.data)

//         // one student can upload more than one assignment according to this logic student uploading file name always same and cause overwrite
//         formData.append('file',pdfBuffer,{
//             filename:`${getStudentName} assignment File ${Date.now()}`,
//             contentType:'application/pdf'
//         })

//         formData.append('questions',JSON.stringify(getAssignmentQuestions))

//         // const getResponseFromAi = await axios.post('https://huggingface-configuration.vercel.app/assignment/assignmentChecker',formData)
//         const getResponseFromAi = await axios.post('http://localhost:4000/assignment/assignmentChecker',formData)
//         console.log(getResponseFromAi)
//         return res.status(200).json({message:"Get Response From AI",getResponseFromAi})


//     }
//     catch(error){
//         console.log("Error in Assignment Checker Function",error)
//         return res.status(400).json({message:"Error in Assignment Checker Function Using AI",error})
//     }
// }

// module.exports = {assignmentCheckerFunction}

const assignmentCheckerFunction = async (req, res) => {
  try {
    const { uploadAssignmentId } = req.body;

    const isUploadAssignmentExist =
      await assignmentUploadingModel.findById(uploadAssignmentId);

    if (!isUploadAssignmentExist) {
      return res.status(400).json({ message: "Assignment Uploading not Exist" });
    }

    const assignmentId = isUploadAssignmentExist.assignmentId;
    const studentId = isUploadAssignmentExist.studentId;

    const getStudentName = await studentRegistrationModel
      .findById(studentId)
      .select("name");

    const getAssignment = await assignmentModel
      .findById(assignmentId)
      // .select("assignmentQuestions")

     const getAssignmentQuestions = getAssignment.assignmentQuestions 
    const fileResponse = await axios.get(
      isUploadAssignmentExist.uploadedFile,
      { responseType: "arraybuffer" }
    )
    
    // console.log("Assignment Questions are :",getAssignmentQuestions)
    const parsed =
  typeof getAssignmentQuestions === "string"
    ? JSON.parse(getAssignmentQuestions)
    : getAssignmentQuestions;

// 🔥 STEP 2: now extract questions
const onlyAssignmentQuestions = parsed.questions;

console.log("Only Assignment Questions:", onlyAssignmentQuestions);
    
    const pdfBuffer = Buffer.from(fileResponse.data);

    const formData = new FormData();

        formData.append(
      "questions",
      JSON.stringify(onlyAssignmentQuestions)
    )

    formData.append("studentName", getStudentName.name)
    formData.append("pdf", pdfBuffer, {
      filename: `assignment_${Date.now()}.pdf`,
      contentType: "application/pdf",
    })

    const getResponseFromAi = await axios.post(
      "http://localhost:4000/assignment/assignmentChecker",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    )

    return res.status(200).json({
      message: "Success",
      data: getResponseFromAi.data,
    })

  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message,
    })
  }
}

module.exports = { assignmentCheckerFunction }