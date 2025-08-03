const counter= require('../Models/Counter/counter.model')

const createCounter = async (req,res)=>{
    try {
        const counterCreation= await counter.create({})
        if(!counterCreation){
            console.log("Data not created")
            return res.status(402).json({message:"Counter not created"})
        }
        console.log("Counter Created Successfully")
        return res.status(200).json({message:"Counter Created Successfully"})
    } catch (error) {

        console.log("Error in Creating counter",error)
        return res.status(404).json({message:'Counter not created:',error})
    }
}

const counterGetter = async (req,res)=>{
    try {
        const {customId} = req.body
        const getCounter = await counter.findOne({customId:customId})
        if(!getCounter){
            console.log("Not Get data from counter")
            return res.status(402).json({message:"Counter not found"})
        }
        console.log(getCounter.sequence)
        return res.status(201).json({message:"Counter Found",getCounter})
    } catch (error) {
        console.log("Error in Getting Counter",error)
        return res.status(404).json({message:"Error in Getting counter",error})
    }
}
const updateCounter = async (req,res)=>{
    try {
        const {customId}= req.body
        const updateCounter = await counter.findOneAndUpdate({customId:customId},{$inc:{sequence:1}},{new:true})
        if(!updateCounter){
            console.log('Counter not updated'
            )
            return res.status(401).json({message:"Counter not update"})
        }
        console.log('Counter Updated successfully')
        return res.status(201).json({message:"Counter updated Successfully",updateCounter})
    } catch (error) {
        console.log(
            "Error in Updating Counter",error
        )
        return res.status(404).json({message:'Error in Updating Counter',error})
    }
}

module.exports = {createCounter,counterGetter,updateCounter}