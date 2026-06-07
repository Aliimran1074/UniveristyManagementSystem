const axios = require('axios')
const FormData= require('form-data')
const quizUploadingModel = require('../../../Models/QuizModel/quizUploading.model')
const studentRegistrationModel = require('../../../Models/UserModels/studentRegistration.model')
const quizModel = require('../../../Models/QuizModel/quiz.model')
const subscriptionModel = require('../../../Models/SuperAdminModels/subscription.model')
const quizChecker = async(req,res)=>{
    try {
        if(!req.file){
            console.log("No File Found Please Upload File First")
            return res.status(400).json({message:"No File Found Please Upload File First"})
        }
        const {questions}= req.body
        const formData= new FormData()
        formData.append('pdf',req.file.buffer,req.file.originalname)
        formData.append('questions',questions)
        const response = await axios.post("https://huggingface-configuration.vercel.app/quiz/quizChecker",formData,{headers:formData.getHeaders()})
        if(!response){
            console.log("Issue in make request from another Server")
            return res.status(404).json({message:"Issue in make request from another Server"})
        }
        const data = response.data
        console.log("Response Get Successfully\n",data)
        return res.status(200).json({message:"Getting Response Successfully",data})
    } catch (error) {
            console.log("Getting Error in Quiz Checker Function",error)
            return res.status(400).json({message:"Error in Quiz Checker Function",error})
    }
}


const quizCheckerFunctionUsingAI = async (req, res) => {
  try {
    const { uploadquizId } = req.body
    const isUploadQuizExist = await quizUploadingModel.findById(uploadquizId)
    if (!isUploadQuizExist) { return res.status(400).json({ message: "Quiz Uploading not Exist" })}
    const checkStatusOfQuiz= isUploadQuizExist.status
    console.log("Status of quiz Checking : ",checkStatusOfQuiz)
    if(checkStatusOfQuiz=='checked'){
      console.log("Quiz Already Checked")
      return res.status(400).json({message:"Quiz Already Checked"})
    }
    const quizId = isUploadQuizExist.quizId
    const studentId = isUploadQuizExist.studentId
    const getStudentName = await studentRegistrationModel
    .findById(studentId)
    .select("name")
    const getQuiz = await quizModel.findById(quizId)
  
    const instituteId = getQuiz.instituteId
    const findSubscription = await subscriptionModel.findOne({instituteId:instituteId})
    if(!findSubscription){
      return res.status(404).json({message:"NO Subscription Found Agaisnt This Institute"})
    }
    const getQuizQuestions = getQuiz.quizQuestions
    const fileResponse = await axios.get(isUploadQuizExist.uploadedFile, { responseType: "arraybuffer" })
    const parsed = typeof getQuizQuestions === "string"
      ? JSON.parse(getQuizQuestions)
      : getQuizQuestions

    const getTotalMarks = parsed.total_marks
    const onlyQuizQuestions = parsed.questions
    // console.log("Total Marks :", getTotalMarks)
    const pdfBuffer = Buffer.from(fileResponse.data)
    const formData = new FormData();
    formData.append(
      "questions",
      JSON.stringify(onlyQuizQuestions)
    )
    formData.append("total_marks", getTotalMarks)
    formData.append("studentName", getStudentName.name)
    formData.append("pdf", pdfBuffer, {
      filename: `quiz_${Date.now()}.pdf`,
      contentType: "application/pdf",
    })

    const getResponseFromAi = await axios.post(
      "https://huggingface-configuration.vercel.app/quiz/quizChecker",
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
      // console.log("Issue in Getting Response From AI")
      return res.status(400).json({ message: "Issue in Getting Response From Ai" })
    }
    console.log("Data :",data)
    const getGivenMarks = data.result.total_marks
    // console.log("Get Given Marks :",getGivenMa)
    console.log("Get Given Marks ", getGivenMarks)
    isUploadQuizExist.marks = getGivenMarks
    isUploadQuizExist.maxMarks = getTotalMarks
    isUploadQuizExist.status = 'checked'
    isUploadQuizExist.marksAssigned = true
    await isUploadQuizExist.save()
      
        findSubscription.aiUsage.quizCheckerUsed+=1
        findSubscription.aiUsage.totalAiRequests+=1
        await findSubscription.save()
    console.log("Succed to Check Assignement Using AI")
    return res.status(200).json({ message: "Succed to Check Assignement Using AI", isUploadQuizExist, data ,findSubscription })


  } catch (error) {
    console.log("Error in Quiz Checker Using AI",error)
    return res.status(500).json({
      message: "Error",
      error: error.message,
    })
  }
}


module.exports={quizChecker,quizCheckerFunctionUsingAI}