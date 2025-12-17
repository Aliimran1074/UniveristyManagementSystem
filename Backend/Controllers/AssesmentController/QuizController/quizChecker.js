const axios = require('axios')
const FormData= require('form-data')
const quizChecker = async(req,res)=>{
    try {

        // console.log("Quiz Checker Function is Running")
        if(!req.file){
            console.log("No File Found Please Upload File First")
            return res.status(400).json({message:"No File Found Please Upload File First"})
        }
        const {questions}= req.body
        
        const formData= new FormData()
        formData.append('pdf',req.file.buffer,req.file.originalname)
        formData.append('questions',questions)

        const response = await axios.post("https://huggingface-configuration.vercel.app/quiz/quizChecker",formData,{headers:formData.getHeaders()})
        // const response  = await axios.post("http://localhost:4000/quiz/quizChecker",formData,{headers:formData.getHeaders()})
        // console.log("Response:",response)
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

module.exports={quizChecker}