// const axios = require('axios')
// const FormData= require('form-data')
// const quizUploadingModel = require('../../../Models/QuizModel/quizUploading.model')
// const studentRegistrationModel = require('../../../Models/UserModels/studentRegistration.model')
// const quizModel = require('../../../Models/QuizModel/quiz.model')
// const subscriptionModel = require('../../../Models/SuperAdminModels/subscription.model')




// const quizCheckerFunctionUsingAI = async (req, res) => {
//   try {
//     const { uploadquizId } = req.body
//     const isUploadQuizExist = await quizUploadingModel.findById(uploadquizId)
//     if (!isUploadQuizExist) { return res.status(400).json({ message: "Quiz Uploading not Exist" })}
//     const checkStatusOfQuiz= isUploadQuizExist.status
//     console.log("Status of quiz Checking : ",checkStatusOfQuiz)
//     if(checkStatusOfQuiz=='checked'){
//       console.log("Quiz Already Checked")
//       return res.status(400).json({message:"Quiz Already Checked"})
//     }
//     const quizId = isUploadQuizExist.quizId
//     const studentId = isUploadQuizExist.studentId
//     const getStudentName = await studentRegistrationModel
//     .findById(studentId)
//     .select("name")
//     const getQuiz = await quizModel.findById(quizId)
  
//     const instituteId = getQuiz.instituteId
//     const findSubscription = await subscriptionModel.findOne({instituteId:instituteId})
//     if(!findSubscription){
//       return res.status(404).json({message:"NO Subscription Found Agaisnt This Institute"})
//     }
//     const getQuizQuestions = getQuiz.quizQuestions
//     const fileResponse = await axios.get(isUploadQuizExist.uploadedFile, { responseType: "arraybuffer" })
//     const parsed = typeof getQuizQuestions === "string"
//       ? JSON.parse(getQuizQuestions)
//       : getQuizQuestions

//     const getTotalMarks = parsed.total_marks
//     const onlyQuizQuestions = parsed.questions
//     // console.log("Total Marks :", getTotalMarks)
//     const pdfBuffer = Buffer.from(fileResponse.data)
//     const formData = new FormData();
//     formData.append(
//       "questions",
//       JSON.stringify(onlyQuizQuestions)
//     )
//     formData.append("total_marks", getTotalMarks)
//     formData.append("studentName", getStudentName.name)
//     formData.append("pdf", pdfBuffer, {
//       filename: `quiz_${Date.now()}.pdf`,
//       contentType: "application/pdf",
//     })

//     const getResponseFromAi = await axios.post(
//       "https://huggingface-configuration.vercel.app/quiz/quizChecker",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//         },
//         maxBodyLength: Infinity,
//         maxContentLength: Infinity,
//       }
//     )
//     const data = getResponseFromAi.data
//     if (!data) {
//       // console.log("Issue in Getting Response From AI")
//       return res.status(400).json({ message: "Issue in Getting Response From Ai" })
//     }
//     console.log("Data :",data)
//     const getGivenMarks = data.result.total_marks
//     // console.log("Get Given Marks :",getGivenMa)
//     console.log("Get Given Marks ", getGivenMarks)
//     isUploadQuizExist.marks = getGivenMarks
//     isUploadQuizExist.maxMarks = getTotalMarks
//     isUploadQuizExist.status = 'checked'
//     isUploadQuizExist.marksAssigned = true
//     await isUploadQuizExist.save()
      
//         findSubscription.aiUsage.quizCheckerUsed+=1
//         findSubscription.aiUsage.totalAiRequests+=1
//         await findSubscription.save()
//     console.log("Succed to Check Assignement Using AI")
//     return res.status(200).json({ message: "Succed to Check Assignement Using AI", isUploadQuizExist, data ,findSubscription })


//   } catch (error) {
//     console.log("Error in Quiz Checker Using AI",error)
//     return res.status(500).json({
//       message: "Error",
//       error: error.message,
//     })
//   }
// }


// module.exports={quizChecker,quizCheckerFunctionUsingAI}

const axios = require("axios")
const FormData = require("form-data")

const quizUploadingModel = require("../../../Models/QuizModel/quizUploading.model")
const studentRegistrationModel = require("../../../Models/UserModels/studentRegistration.model")
const quizModel = require("../../../Models/QuizModel/quiz.model")
const subscriptionModel = require("../../../Models/SuperAdminModels/subscription.model")

const quizCheckerCore = async (uploadQuizId) => {
  try {

    const upload =
      await quizUploadingModel.findById(uploadQuizId)

    if (!upload) {
      return { success: false, message: "Upload not found" }
    }

    if (upload.status === "checked") {
      return { success: false, message: "Already checked" }
    }

    const quiz =
      await quizModel.findById(upload.quizId)

    if (!quiz) {
      return { success: false, message: "Quiz not found" }
    }

    const subscription =
      await subscriptionModel.findOne({
        instituteId: quiz.instituteId
      })

    if (!subscription) {
      return { success: false, message: "Subscription not found" }
    }

    const student =
      await studentRegistrationModel.findById(upload.studentId)

    const fileResponse =
      await axios.get(upload.uploadedFile, {
        responseType: "arraybuffer"
      })

    const parsed =
      typeof quiz.quizQuestions === "string"
        ? JSON.parse(quiz.quizQuestions)
        : quiz.quizQuestions

    const totalMarks = parsed?.total_marks || 0
    const questions = parsed?.questions || []

    const pdfBuffer =
      Buffer.from(fileResponse.data)

    const formData = new FormData()

    formData.append("questions", JSON.stringify(questions))
    formData.append("total_marks", totalMarks)
    formData.append("studentName", student?.name || "Student")
    formData.append("pdf", pdfBuffer, {
      filename: `quiz_${Date.now()}.pdf`
    })

    const aiResponse =
      await axios.post(
        "https://huggingface-configuration.vercel.app/quiz/quizChecker",
        formData,
        {
          headers: formData.getHeaders(),
          maxBodyLength: Infinity,
          maxContentLength: Infinity
        }
      )

    const marks =
      aiResponse.data?.result?.total_marks || 0

    upload.marks = marks
    upload.maxMarks = totalMarks
    upload.status = "checked"
    upload.marksAssigned = true

    subscription.aiUsage.quizCheckerUsed += 1
    subscription.aiUsage.totalAiRequests += 1

    await upload.save()
    await subscription.save()

    return {
      success: true,
      message: "Quiz checked successfully",
      data: upload
    }

  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const quizCheckerFunctionUsingAI = async (req, res) => {

  const result =
    await quizCheckerCore(req.body.uploadquizId)

  if (!result.success) {
    return res.status(400).json(result)
  }

  return res.status(200).json(result)
}


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

module.exports = { quizCheckerCore ,quizCheckerFunctionUsingAI ,quizChecker }