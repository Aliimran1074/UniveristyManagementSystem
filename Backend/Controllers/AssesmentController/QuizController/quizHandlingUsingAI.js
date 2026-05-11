const createPdfInBuffer = async (text, info) => {
    try {
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
                .fontSize(16)
                .text('quiz', {
                    align: 'center'
                })
            document.moveDown(1)
            document
                .fontSize(16)
                .text(`Teached By ${info.instructorName}`, {
                    align: 'center'
                })
            document.moveDown(1)
            document
                .fontSize(16)
                .text(`${text.title}`, {
                    align: 'center'
                })
            document.moveDown(1)
            if(info.quizType=='Q/A'){
                for (let i = 0; i < questions.length; i++) {
                    document.fontSize(12).text(`Q${i + 1} ${questions[i]}`, {align: 'left'})
                    document.moveDown(0.5)
                } }
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
    const inputData = {
        topicsName: topicName,
        type: getTypeOfQuiz,
        noOfQuestions: getFirstTopicFromListOfTopics.noOfQuestions,
        difficultyLevel: getFirstTopicFromListOfTopics.difficultyLevel,
       // totalMarks : write total marks here
    }

    const quizData =await createQuizViaTopic(inputData)
    if (quizData.message !== "Done") {
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
        quizType :getTypeOfQuiz
    }

    const data = quizData.finalResult

    const parseData = JSON.parse(data)

    const fileName =`${inputData.topicsName} quiz file.pdf`

    // const document = createPdf(fileName, parseData, info) // yeh function file system ki madad se file create kar raha tha lekin humay buffer ka use karna hai is liye humne is function ko commit kardia


    const pdfBuffer = await createPdfInBuffer(parseData, info)
    if (!pdfBuffer) {
        return res.status(400).json({ message: "Issue in Creating PDF in Buffer"})}

const imageKitResponse= await imageKitConfig.upload({
                        file:pdfBuffer,
                        fileName:fileName,
                        folder:"/quizFile"
                    })
                    const getUrl = imageKitResponse.url

if(getUrl.length>0 || getUrl){
    const quizCreation = await quizModel.create({instituteId:quizTopicsInfo.instituteId,quizFile:getUrl,course:quizTopicsInfo.course,createdBy:quizTopicsInfo.instructor,duration:7})

return res.status(200).json({message: "Document Created Successfully",data,getUrl,quizCreation})
}
// ab yahan humne assignemnt model ke through quiz to upload kardia but ab yahan issue hai  yeh k validations check nhi ki jo hum limit check karte hai k total kitne no of quizs hone chahiye , agr koi manual quiz banaya gya hai to is me or AI wale quiz me kitne din ka gap hona chahiye
return res.status(200).json({message: "Document Created Successfully, not Uploaded in quiz Model",data,getUrl})
}



const createQuizViaTopic =async(data)=>{
    try {
        const {topicsName,type,noOfQuestions,difficultyLevel} =data

        const response = await axios.post('https://huggingface-configuration.vercel.app/setup/quizGeneratorByTopicName',{
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
        console.log("LLM give data successfully",finalData)
        return finalData
       
    } catch (error) {
        console.log("Error in Getting quiz Data from LLM",error)
        return error
    }
}
