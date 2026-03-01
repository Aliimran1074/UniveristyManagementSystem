const quizModel = require("../../../Models/QuizModel/quiz.model")

const manualQuizCreation=async()=>{

try {
 const {instituteId,courseId,createdBy,duration,quizFile} = req.body
 if(!req.file){
    console.log("File not Found")
    return res.status(400).json({message:"Quiz File not Found"})
 }
 const createQuiz = await quizModel.create({instituteId:instituteId,courseId:courseId,createdBy:createdBy,duration:duration,quizFile:quizFile})

 if(!createQuiz){
    console.log("Not able to Create Quiz")
    return res.status(404).json({message:"Not able to create Quiz"})
 }
 console.log("Quiz Created Successfully",createQuiz)
 return res.status(200).json({message:"Quiz has been Created Successfully",createQuiz})
 
} catch (error) {
    
    console.log("Not able to create manual Quiz",error)
    return res.status(404).json({message:"Not able to create a manual Quiz",error})
}
}


module.exports = {manualQuizCreation}
