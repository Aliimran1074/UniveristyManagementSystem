const assignmentModel = require('../../Models/Assignment/assignment.model')
const assignmentTopicModel = require('../../Models/AssignmentInputModel/assignment.input.model')
const {uploadforAssessment}= require('../../Multer/multer')
const fs = require('fs')
const pdfDocument= require('pdfkit')
const multer =require('multer')
const FormData = require('form-data')
const axios =require('axios')
const data = require('../../data.json')
// pdf file creating function

// MUlter Storage setting

const checking=async(req,res)=>{
try{
    const{fileName}= req.body
    const document= createPdf(fileName,data)
    if(!document){
        console.log("Issue in Creating Document")
    return res.status(400).json({message:"Issue in Creating Document"})
    }
    return res.status(200).json({message:"Document Created Successfully"})
}
catch(error){
    console.log("Issue in Creating Pdf ",error)
    return res.status(404).json({message:"Issue in Creating Pdf"})
}
}


const createAutoAssignmentByGivingFile = async(req,res)=>{
    try {
        
        console.log('Function Running')
        // const {course} =req.body
        if(!req.file){
            console.log("PDF not Found")
            return res.status(203).json({message:"PDF not Found"})
        }

        // will done committed work  
    //     const checkNoOfAssignmentofParticularCourse = await assignmentModel.find({course:course}) 
    //     if(checkNoOfAssignmentofParticularCourse.length>3){
    //     console.log("Already Four Assignment Uplaoded of Particular Subject")
    //     return res.status(201).json({message:'Already 4 assignments uploaded '})
    // }
    // const assignmentDateChecker = await assignmentDateCalculator(course)
    // console.log('Assignment Date Message',assignmentDateChecker)
    // if(!assignmentDateChecker){
    //     console.log("Not 30 Days Completed")
    //     return res.status(202).json({message:"30 Days not Completed"})
    // }

        const formData = new FormData()
        formData.append('pdf',req.file.buffer,req.file.originalname)
    

        // const response = await axios.post("http://localhost:4000/setup/generate-assignment-from-pdf",formData,{headers:formData.getHeaders()})
        const response = await axios.post("https://huggingface-configuration.vercel.app/setup/generate-assignment-from-pdf",formData,{headers:formData.getHeaders()})
        console.log("Response is: ",response)
        if(!response){
            console.log("Issue in API calling From Hugging Face Server")
            return res.status(400).json({message:"Request Failed Here"})
        } 
        const data = response.data
        const parseData =JSON.parse(data.assignment)
        console.log(parseData)
        const fileName = `${Date.now()}file.pdf`
        const document=createPdf(fileName,parseData)
        if(!document){
            console.log("Issue in Creating Document")
            return res.status(402).json({message:"Issue in Creating Assignment"})
        }

        return res.status(200).json({message:"Document Created Successfully"})
        
    } catch (error) {
        console.log("Error in Get Assignment Data function",error)
        return res.status(404).json({message:"Error in Get Assignment Data Function"})
    }
}


const checkAssignmentInput =async()=>{
    try {
        const getPendingAssignment = await assignmentTopicModel.find({status:'pending'})
        // console.log(getPendingAssignment)
       
       const pendingAssignemntCourse= getPendingAssignment.map((currentElement,currentIndex)=>{
                return [currentElement.course.toString(),currentElement]
       })

       const uniquePendingCourse = [
        ... new Map(pendingAssignemntCourse).values() //confused (dry run needed)
       ]

    //  running loop of every unique course and match date first and get only allowed courses
    const allowedCourse=[]
    
       for (const currentElement of uniquePendingCourse){
        const result = await assignmentDateCalculator(currentElement.course)
        // console.log(result)
        if(result.message==true){
            allowedCourse.push(currentElement)
        } 
       }

       console.log("Allowed Array", allowedCourse)
       for(const currentObject of allowedCourse){
        const message = await autoAssignmentCreation(currentObject)
        console.log(message)
       }
       return {message:'Work Completed'}
    
    //  now will push this array into reddis /or if array small will apply function directly
    
    }
     catch (error) {
    console.log('Error in Check Assignment Input ',error)    
    return {message:"Error in check Assignment Input",error}   
    }
}


const createPdf = (fileName,text)=>{
try {
    // console.log("Working on Create Pdf Function")
    const questions= text.questions
    // console.log("Text is",text)
    // console.log("Text is ",text[0].question)
    // console.log("Text length:",text.length)
    // if(text.length>3){
        // console.log("I am entering in if condition")
        // const newArray = text.slice(0,3)
        // console.log("I am new Array",newArray)
    const document = new pdfDocument()
    document.pipe(fs.createWriteStream(fileName))
    // pdf formatting 
    document.fontSize(20).text("MAA Institute",{align:'center',underline:true})
    document.moveDown(2)

    document.fontSize(16).text('Assignment',{align:'center'})
    document.moveDown(1)

    document.fontSize(16).text(`${text.title}`,{align:'center'})
    document.moveDown(1)

    for(let i=0;i<questions.length;i++){
       document.fontSize(12).text(`Q${i+1} ${questions[i]}`,{align:'left'})
       document.moveDown(0.5)
    }
    // newArray.forEach((data,index)=>{
    // document.fontSize(12).text(`Q${index+1}) ${data.question}`,{align:'left'})
    // document.moveDown(0.5)
    
// })
document.end()
console.log("PDF created Successfully")
return document
//     }
//     else{
    
//     const document = new pdfDocument()
//     document.pipe(fs.createWriteStream(fileName))
//     // pdf formatting 
//     document.fontSize(20).text("Maryam Ali Amaaz Institute",{align:'center',underline:true})
//     document.moveDown(2)

//     document.fontSize(16).text('Assignment',{align:'center'})
//     document.moveDown(1)

//     text.forEach((data,index)=>{
//     document.fontSize(12).text(`Q${index+1}) ${data.question}`,{align:'left'})
//     document.moveDown(0.5)
// })
//     document.end()
//     return document
// }
} catch (error) {
    console.log("Error in creating Pdf",error)

}
}


const assignmentFileCreation = (topic,fileName)=>{
    try {
        // const {topic}=req.body
        let topicToLowerCase = topic.toLowerCase()
        console.log("Lower case topic :",topicToLowerCase)
        const raw =fs.readFileSync('./Question Answer JSON/biology.json',"utf8")
        const data = JSON.parse(raw)
        
        console.log("Here data is ",data)
        const filtered = data.questions.filter((response)=>{
            return response.question.includes(topicToLowerCase)    })        
            // return res.status(200).json({message:"Data get successfully",filtered})
            const pdfFile = createPdf(fileName,filtered) 
            return pdfFile
            // return filtered
        } catch (error) {
            console.log("Error in topic getting function ",error)  
            return error.message  
            // return res.status(404).json({message:"Error in File Creation function"})
        }
    }
    
    // auto assignment setting remain 
    async function assignmentDateCalculator(course){
        try {
            console.log('course',course) 
            const assignment = await assignmentModel.find({course:course})
            if(!assignment || assignment.length<1){
                console.log("No Assignment Found")
                return {message:true}
            }
            let assignmentLength = assignment.length
            // console.log(assignmentLength)
            const generatedDate= assignment[assignmentLength-1].generatedDate 
            // console.log(assignment[assignmentLength-1].generatedDate)

            const generateTime = generatedDate.getTime()
            // console.log(generateTime)

            const currentTime = Date.now()
            // console.log(currentTime)
            // if()

            // const totalMiliSecondCountingInMonth = (30*24*60*60*1000) //will uncomment after testing
            const totalMiliSecondCountingInMonth= 12
            // console.log(currentTime-generateTime)
            if(currentTime-generateTime<totalMiliSecondCountingInMonth){
                return {message:false}
            }
            else{
                return {message:true}
            }

        } catch (error) {
            console.log("Error in assignment Date checker",error)
        }
    }


const autoAssignmentCreation=async(inputObject)=>{
try
    {
        // console.log("Input Object is :",inputObject)
        const topic = inputObject.assignmentTopic
        // console.log("Topic is:",topic)
        const course = inputObject.course
        const fileName = topic+'file.pdf'
        const createdBy = inputObject.instructor
        const assignmentFile = 'abc'
        const duration = 7
const checkNoOfAssignmentofParticularCourse = await assignmentModel.find({course:course}) 
    if(checkNoOfAssignmentofParticularCourse.length>10){ //will change to 3
        console.log("Already Four Assignment Uplaoded of Particular Subject")
        return {message:'Already 4 assignments uploaded '}
    }
    
    const assignment = assignmentFileCreation(topic,fileName)
    const assignmentCreate= await assignmentModel.create({assignmentFile:assignmentFile,course:course,createdBy,duration})

    if(!assignmentCreate){
        console.log("Issue in Creating Assignment ")
        return {message:"Issue in Creating Assignment"}
    }
    const changeInputStatus = await assignmentTopicModel.updateOne({course:course,assignmentTopic:topic},{status:'uploaded'})
        console.log('ChangeInputStatus',changeInputStatus) 
    // console.log("Assignment also created Successfully ",assignment)
    return {message:"Successfully Create Assignment",assignmentCreate }
    
} catch (error) {
    console.log("Error in Assignment Creation Function ",error)
    return {message:'Issue in Create Assignement Function ',error}

} 

}

const assignmentQueueCalling =async (req,res)=>{
try {
    const message = await checkAssignmentInput()
    if(!message){
        return res.status(400).json({message:'Assignment Queue Calling Function having some issue'})
    }
    return res.status(200).json({message:"Done and Dusted",message})
} catch (error) {
    console.log('Issue in Assignment Queue Function',error)
    return res.status(404).json({message:"Issue in Assignment Queue Function",error})
}
}

const createAssignment=async(req,res)=>{
try {
        const {assignmentFile,course,createdBy,duration,topic,fileName}=req.body
    
    // Auto Assignment Agent Functionality
    
    // check existing assignment of particular subject
    const checkNoOfAssignmentofParticularCourse = await assignmentModel.find({course:course}) 
    if(checkNoOfAssignmentofParticularCourse.length>3){
        console.log("Already Four Assignment Uplaoded of Particular Subject")
        return res.status(201).json({message:'Already 4 assignments uploaded '})
    }

    // Date Calculation work remain??
    const assignment = assignmentFileCreation(topic,fileName)
    const assignmentCreate= await assignmentModel.create({assignmentFile:assignmentFile,course:course,createdBy,duration})

    if(!assignmentCreate){
        console.log("Issue in Creating Assignment ")
        return res.status(400).json({message:"Issue in Creating Assignment"})
    }
    console.log("Assignment also created Successfully ",assignment)
    return res.status(200).json({message:"Successfully Create Assignment",assignmentCreate })
    
} catch (error) {
    console.log("Error in Assignment Creation Function ",error)
    return res.status(404).json({message:'Issue in Create Assignement Function ',error})

} 
}



// const createAutoAssignmentByUploadingFile = async(req,res)=>{
//     try {
//         const {course} =req.body

//         // check already uploaded assignment of that particular course
        


//     } catch (error) {
//         console.log("Error in Create AutoAssignment By File Uploading",error)
//         return res.status(404).json({message:"Error in Create AutoAssignment By File Uploading",error})
//     }
// }


module.exports = {createAssignment,assignmentFileCreation,assignmentDateCalculator,autoAssignmentCreation,assignmentQueueCalling,checkAssignmentInput,checking,createAutoAssignmentByGivingFile}



// let today= new Date().getTime()
    // let endDate = new Date()
    // endDate.setDate(endDate.getDate()+duration)
    // endDate.setHours(23,59,59,999)
    // console.log(endDate)   
    // let getTime = endDate.getTime()
    // console.log("Get Time :",getTime)
    // console.log("Today Time :",today)
    // if(today>getTime){
    //     console.log("Today is greater ")
    // }
    // else{
    //     let time = (getTime-today)
    //     totalTime = Math.round(time/86400000)
    //     console.log("Time remain :",time)
    //     console.log("Total Time remain :",totalTime)

    //      console.log("7 Days are greater")
    // }

    // let setEndDate = date+7
    // const newDate =new Date(setEndDate)
    // console.log(newDate)

    // console.log("Duration is ",duration)
    // console.log("Assignment Creation : ",assignmentCreate)
    // return res.status(200).json({message:"Assignment Created Successfully",assignmentCreate})

    // console.log("No of assignment Found Of Particular Subject",checkNoOfAssignmentofParticularCourse)
    // return res.status(200).json({message:"Assignment Found of this Course",checkNoOfAssignmentofParticularCourse})