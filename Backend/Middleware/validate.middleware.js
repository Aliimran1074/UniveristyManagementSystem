const validate= (schema)=async(req,res,next)=>{
try {
    const parseBody= await schema.parseAsync(req.body)
    req.body=parseBody
    next()
} catch (error) {
    console.log("Error:",error)
    const status= 422
    const extraDetails=error.errors[0].message
    const message= "Fill the inputs Properly"
    const Error={
        status,message,Error
    }
    next(Error)
}

}

module.exports=validate