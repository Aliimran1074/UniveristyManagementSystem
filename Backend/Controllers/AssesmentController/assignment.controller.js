const assignmentModel = require('../../Models/Assignment/assignment.model')
const {uploadforAssessment}= require('../../Multer/multer')
const fs = require('fs')
const pdfDocument= require('pdfkit')

// pdf file creating function

const createPdf = (fileName,text)=>{
try {
    console.log("Text is ",text[0].question)
    console.log("Text length:",text.length)
    if(text.length>3){
        console.log("I am entering in if condition")
        const newArray = text.slice(0,3)
        console.log("I am new Array",newArray)
    const document = new pdfDocument()
    document.pipe(fs.createWriteStream(fileName))
    // pdf formatting 
    document.fontSize(20).text("Maryam Ali Amaaz Institute",{align:'center',underline:true})
    document.moveDown(2)

    document.fontSize(16).text('Assignment',{align:'center'})
    document.moveDown(1)

    newArray.forEach((data,index)=>{
    document.fontSize(12).text(`Q${index+1}) ${data.question}`,{align:'left'})
    document.moveDown(0.5)
    
})
document.end()
return document
    }
    else{

    
    const document = new pdfDocument()
    document.pipe(fs.createWriteStream(fileName))
    // pdf formatting 
    document.fontSize(20).text("Maryam Ali Amaaz Institute",{align:'center',underline:true})
    document.moveDown(2)

    document.fontSize(16).text('Assignment',{align:'center'})
    document.moveDown(1)

    text.forEach((data,index)=>{
    document.fontSize(12).text(`Q${index+1}) ${data.question}`,{align:'left'})
    document.moveDown(0.5)
})
    document.end()
    return document}
} catch (error) {
    console.log("Error in creating Pdf",error)

}
}


const assignmentFileCreation = (topic,fileName)=>{
try {
    // const {topic}=req.body
    const raw =fs.readFileSync('./Question Answer JSON/biology.json',"utf8")
    const data = JSON.parse(raw)
    
    const filtered = data.questions.filter((response)=>{
        return response.question.includes(topic)    })        
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




const createAssignment=async(req,res)=>{
try {

    const {assignmentFile,course,createdBy,duration,topic,fileName}=req.body
    
    // Auto Assignment Agent Functionality
    const assignment = assignmentFileCreation(topic,fileName)
    
    // check existing assignment of particular subject
    const checkNoOfAssignmentofParticularCourse = await assignmentModel.find({course:course}) 
    if(checkNoOfAssignmentofParticularCourse.length>3){
        console.log("Already Four Assignment Uplaoded of Particular Subject")
        return res.status(201).json({message:'Already 4 assignments uploaded '})
    }

    const assignmentCreate= await assignmentModel.create({assignmentFile:assignmentFile,course:course,createdBy,duration})

    if(!assignmentCreate){
        console.log("Issue in Creating Assignment ")
        return res.status(400).json({message:"Issue in Creating Assignment"})
    }
    console.log("Assignment also created Successfully ",assignment)
    return res.status(200).json({message:"Successfully Create Assignment",assignmentCreate })
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
} catch (error) {
    console.log("Error in Assignment Creation Function ",error)
    return res.status(404).json({message:'Issue in Create Assignement Function ',error})

}
}

module.exports = {createAssignment,assignmentFileCreation}