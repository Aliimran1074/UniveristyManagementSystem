const quizModel = require('../../../Models/QuizModel/quiz.model')
const quizTopicModel = require('../../../Models/quizInputModel/quiz.input.model')
const pdfDocument= require('pdfkit')
const axios =require('axios')
const subscriptionModel = require('../../../Models/SuperAdminModels/subscription.model')
const courseModel = require('../../../Models/CourseModels/course.model')
const staffModel = require('../../../Models/UserModels/staff.model')
const {imageKitConfig,fileIdByName}= require('../../../ImageKit.IO Setup/setup')
const instituteModel = require('../../../Models/InstituteBatchesClasses/Institute.model')

const createPdfInBuffer = async (text,info) => {
    try {
        // console.log("This is Text :",text)
        return new Promise((resolve, reject) => {
            const questions = text.questions
            const document = new pdfDocument()
            const buffers = []

            // collect chunks
            document.on('data', (chunk) => {
                buffers.push(chunk)
            })
            // completed
            document.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers)
                console.log("PDF Buffer Created Successfully")
                resolve(pdfBuffer)
            })
            // error handling
            document.on('error', (error) => {
                reject(error)
            })
            // PDF Formatting
            document
                .fontSize(20)
                .text(`${info.instituteName}`, {
                    align: 'center',
                    underline: true
                })
            document.moveDown(2)
            document
                .fontSize(18)
                .text('Quiz File', {
                    align: 'center',
                   
                })
            document.moveDown(1)
            document
         .fontSize(16)
    .text(`Teached By ${info.instructorName}`, {
        align: 'left',
        continued: true
    })
    .text(`Total Marks: ${text.total_marks}`, {
        align: 'right'
    })
            document.moveDown(1)
            // document
            //     .fontSize(16)
            //     .text(`${text.title}`, {
            //         align: 'center'
            //     })
            // document.moveDown(1)
            if (info.quizType == 'Q/A') {
    for (let i = 0; i < questions.length; i++) {

        document
            .fontSize(12)
            .text(`Q${i + 1}: ${questions[i].question}`)

        document.moveDown(0.5)
    }
}
            else{
                for (let i = 0; i < questions.length; i++) {
                    document.fontSize(12).text(`Q${i + 1} ${questions[i].question}`, {
                            align: 'left'
                        })
                    document.moveDown(0.5)
                    for (let j =0;j<questions[i].options.length;j++){
                        document.fontSize(12).text(`${j+1} ${questions[i].options[j]}`)
                        document.moveDown(0.2)
                    } document.moveDown(0.8)
                }
            }
            document.end()})}
    catch (error) {
        console.log("Error in creating Pdf", error)  }
}


const createQuizFunction = async (quizTopicsInfo,filterOnlyPendingQuiz,res) => {
    
    const getFirstTopicFromListOfTopics =filterOnlyPendingQuiz[0]
    const topicName =getFirstTopicFromListOfTopics.topicName
    const getTypeOfQuiz = getFirstTopicFromListOfTopics.type
    const totalMarks = getFirstTopicFromListOfTopics.totalMarks
    const inputData = {
        topicsName: topicName,
        type: getTypeOfQuiz,
        noOfQuestions: getFirstTopicFromListOfTopics.noOfQuestions,
        difficultyLevel: getFirstTopicFromListOfTopics.difficultyLevel,
        totalMarks :totalMarks
    }

    const quizData =await createQuizViaTopic(inputData)
    if (quizData.message !== "Final Output is :") {
        return res.status(400).json({
            message: "Issue in Getting Result from LLM"
        })
    }

    // save date
    quizTopicsInfo.dateOfLastQuizCreated =new Date()

    // update topic status
    for (let i = 0; i < quizTopicsInfo.quizTopics.length; i++) {

        if (quizTopicsInfo.quizTopics[i].topicName == topicName) {
            quizTopicsInfo.quizTopics[i].status ='uploaded'
            break
        }
    }

    await quizTopicsInfo.save()

    // institute info
    const instituteInfo =await instituteModel.findById(quizTopicsInfo.instituteId)

    if (!instituteInfo) { return res.status(404).json({ message: "Institute Not Found" })}

    // instructor info
    const instructorInfo =await staffModel.findById( quizTopicsInfo.instructor )

    if (!instructorInfo) {return res.status(404).json({message: "Instructor Not Found"})}

    const info = {
        instituteName: instituteInfo.name,
        instructorName: instructorInfo.name,
        quizType :getTypeOfQuiz,
        totalMarks :totalMarks
    }


    
    const fileName =`${inputData.topicsName} quiz file.pdf`
 
    // const questions = quizData.finalOuput.questions
    // const parseData = JSON.parse(questions)
    // console.log("Question is : ",questions)
    // console.log("Parse Data is :",parseData)
    // const document = createPdf(fileName, parseData, info) // yeh function file system ki madad se file create kar raha tha lekin humay buffer ka use karna hai is liye humne is function ko commit kardia
    // const pdfBuffer = await createPdfInBuffer(parseData, info)

    const quizFinalOutput=quizData.finalOuput
    const pdfBuffer = await createPdfInBuffer(quizFinalOutput,info)

    if (!pdfBuffer) {
        return res.status(400).json({ message: "Issue in Creating PDF in Buffer"})}

const imageKitResponse= await imageKitConfig.upload({
                        file:pdfBuffer,
                        fileName:fileName,
                        folder:"/quizFile"
                    })
                    const getUrl = imageKitResponse.url


if(getUrl.length>0 || getUrl){
    const quizQuestions = JSON.stringify(quizFinalOutput)
    console.log("Quiz Questions Are:",quizQuestions)
    const quizCreation = await quizModel.create({instituteId:quizTopicsInfo.instituteId,quizFile:getUrl,course:quizTopicsInfo.course,createdBy:quizTopicsInfo.instructor,duration:7,quizQuestions:quizQuestions,quizType:getTypeOfQuiz})

            const findSubscription = await subscriptionModel.findOne({instituteId:quizTopicsInfo.instituteId})
            if(!findSubscription){
              return res.status(404).json({message:"No Subscription Found Agaisnt This Institute"})   }
            findSubscription.aiUsage.quizGeneratorUsed+=1
            findSubscription.aiUsage.totalAiRequests+=1
            await findSubscription.save()
        
return res.status(200).json({message: "Document Created Successfully",getUrl,quizCreation,findSubscription})
}

// ab yahan humne quiz model ke through quiz to upload kardia but ab yahan issue hai  yeh k validations check nhi ki jo hum limit check karte hai k total kitne no of quizs hone chahiye , agr koi manual quiz banaya gya hai to is me or AI wale quiz me kitne din ka gap hona chahiye
return res.status(200).json({message: "Document Created Successfully, not Uploaded in quiz Model",data,getUrl})
}


const createQuizViaTopic =async(data)=>{
    try {
        const {topicsName,type,noOfQuestions,difficultyLevel,totalMarks} =data
        // console.log("Topics Name is :",topicsName)

        const response = await axios.post('https://huggingface-configuration.vercel.app/quiz/quizGeneratorByTopicName',{
            topicsName,
            type,
            noOfQuestions,
            difficultyLevel,
            totalMarks,
            format:"JSON"
        })
        if(!response){
            const message="LLM not responding"
            console.log(message)
            return message
        }
        const finalData = response.data

        return finalData
       
    } catch (error) {
        console.log("Error in Getting quiz Data from LLM",error)
        return error
    }
}


const functionOfSelectingOfQuizTypeForCreation = async (req, res) => {
    try {
        const { mainQuizTopicsId } = req.body
        const quizTopicsInfo = await quizTopicModel.findById(mainQuizTopicsId)
        if (!quizTopicsInfo) {
            return res.status(404).json({
                message: "Quiz Topic Record Not Found"
            })}
        const getArrayOfQuizTopics = quizTopicsInfo.quizTopics
        const filterOnlyPendingQuiz = getArrayOfQuizTopics.filter((currentElement) => {
            return currentElement.status == 'pending'
                && currentElement.source == 'outside'
        })
        if (filterOnlyPendingQuiz.length < 1) {
            return res.status(404).json({
                message: "No Topic is Pending to Create Quiz"
            })
        }
        const getDateOfLastQuizCreated = quizTopicsInfo.dateOfLastQuizCreated
        // if first Quiz not created
        if (!getDateOfLastQuizCreated) {
            return await createQuizFunction(
                quizTopicsInfo,
                filterOnlyPendingQuiz,
                res)}
        // compare dates
        const todayMilliseconds = Date.now()
        const lastQuizMilliseconds =new Date(getDateOfLastQuizCreated).getTime()
        const quizGapDays =Number(quizTopicsInfo.quizGapDuration)
        const quizGapMilliseconds =quizGapDays * 24 * 60 * 60 * 1000
        const difference =todayMilliseconds - lastQuizMilliseconds

        if (difference < quizGapMilliseconds) {
            return res.status(400).json({
                message: `${quizGapDays} Days Not Completed Yet`
            })
        }

        // create next Quiz
        return await createQuizFunction(
            quizTopicsInfo,
            filterOnlyPendingQuiz,
            res
        )
    }
    catch (error) {

        console.log("Error in Quiz Selecting Type Function", error)

        return res.status(500).json({
            message: "Error in Quiz Selecting Type Function",
            error: error.message
        })
    }
}

module.exports ={functionOfSelectingOfQuizTypeForCreation}