const axios = require('axios')

// const apiUrl = process.env.API_URL
const apiUrl =process.env.Url
// const token= process.env.HF_Token
const token = process.env.HF_ReadToken
 
const generateAnswer= async(req,res)=>{
    try {
        if(!token){
            console.log("Token not found")
            return res.status(404).json({message:"Token not found"})
        }
        console.log("Token",token)
        const question = req.body.question
        // const prompt `<s>[INST]${question}[/INST]`
        const prompt= `<s>[INST] ${question} [/INST]`
        const response  = await axios.post(
            apiUrl,
            {
                inputs:prompt,
                parameters:{
                    max_new_tokens:250,
                    temperature:0.7
                }
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            }
        )
        
        console.log('Response:',response)
        console.log('Response.data:',response.data)
        console.log('Response .data [0]:',response.data[0])
    

        const generatedText =response.data[0].generated_text
        return res.status(200).json({message:'Successfully done',generatedText})

    } catch (error) {
        console.log("Error in generating Answer for Hugging Face Model",error)
        return res.status(400).json({message:'Issue in Hugging Face Function ',error})    
    }
}

module.exports={generateAnswer}