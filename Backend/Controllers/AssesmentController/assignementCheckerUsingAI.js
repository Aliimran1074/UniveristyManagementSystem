const { default: axios } = require("axios")
const assignmentModel = require("../../Models/Assignment/assignment.model")
const assignmentUploadingModel = require("../../Models/Assignment/assignmentUploading.model")
const FormData = require('form-data')
const studentRegistrationModel = require('../../Models/UserModels/studentRegistration.model')
const subscriptionModel = require("../../Models/SuperAdminModels/subscription.model")

const assignmentCheckerFunction = async (req,res) => {
  try {
    const { uploadAssignmentId } = req.body
    const isUploadAssignmentExist = await assignmentUploadingModel.findById(uploadAssignmentId)
    if (!isUploadAssignmentExist) { return res.status(400).json({ message: "Assignment Uploading not Exist" }) }
    // const instituteId = isUploadAssignmentExist
    const checkStatusOfAssignment= isUploadAssignmentExist.status
    console.log("Status of Assignment Checking : ",checkStatusOfAssignment)
    if(checkStatusOfAssignment=='checked'){
      console.log("Assignment Already Checked")
      return res.status(400).json({message:"Assignment Already Checked"})
    }
    const assignmentId = isUploadAssignmentExist.assignmentId
    const assignmentData = await assignmentModel.findById(assignmentId)
   
    if(!assignmentData){
   return res.status(404).json({
      message:"Assignment Not Found"
   })
}
    const instituteId = assignmentData.instituteId
    const findSubscription = await subscriptionModel.findOne({instituteId:instituteId})
    if(!findSubscription){
      return res.status(404).json({message:"NO Subscription Found Agaisnt This Institute"})
    }
    // const aiUsage = findSubscription.aiUsage
    // const assignmentCheckerUsed=aiUsage.assignmentCheckerUsed
    // const totalAiUsage = aiUsage.totalAiRequests
    const studentId = isUploadAssignmentExist.studentId
    const getStudentName = await studentRegistrationModel
      .findById(studentId)
      .select("name")
    const getAssignment = await assignmentModel.findById(assignmentId)
    const getAssignmentQuestions = getAssignment.assignmentQuestions
    const fileResponse = await axios.get(isUploadAssignmentExist.uploadedFile, { responseType: "arraybuffer" })
    const parsed = typeof getAssignmentQuestions === "string"
      ? JSON.parse(getAssignmentQuestions)
      : getAssignmentQuestions

    const getTotalMarks = parsed.total_marks
    const onlyAssignmentQuestions = parsed.questions
    console.log("Total Marks :", getTotalMarks)
    const pdfBuffer = Buffer.from(fileResponse.data)
    const formData = new FormData()
    formData.append(
      "questions",
      JSON.stringify(onlyAssignmentQuestions)
    )
    formData.append("total_marks", getTotalMarks)
    formData.append("studentName", getStudentName.name)
    formData.append("pdf", pdfBuffer, {
      filename: `assignment_${Date.now()}.pdf`,
      contentType: "application/pdf",
    })

    const getResponseFromAi = await axios.post(
      "https://huggingface-configuration.vercel.app/assignment/assignmentChecker",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    )
    const data = getResponseFromAi.data
    if (!data) {
      return res.status(400).json({ message: "Issue in Getting Response From Ai" })
    }
    const getGivenMarks = data.checkAssignmentData.total_marks
    console.log("Get Given Marks ", getGivenMarks)
    isUploadAssignmentExist.marks = getGivenMarks
    isUploadAssignmentExist.maxMarks = getTotalMarks
    isUploadAssignmentExist.status = 'checked'
    isUploadAssignmentExist.marksAssigned = true
    findSubscription.aiUsage.assignmentCheckerUsed+=1
    findSubscription.aiUsage.totalAiRequests+=1

    await findSubscription.save()
    await isUploadAssignmentExist.save()
    console.log("Succed to Check Assignement Using AI")
    return res.status(200).json({ message: "Succed to Check Assignement Using AI", isUploadAssignmentExist, data,findSubscription})
 } 
  catch (error) {
    console.log("Error in Assignment Checker Using AI",error)
    return res.status(500).json({
      message: "Error",
      error: error.message,
    })
  }
}

module.exports = {assignmentCheckerFunction}