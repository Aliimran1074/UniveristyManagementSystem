const timeSlotModel= require('../../Models/TimeSlot/timeSlot.model')

const timeSlotCreation = async (req,res)=>{
    try {
        const {day,startTime,endTime}=req.body
        const data ={day:day,
            startTime:{
                hours:startTime.hours,
                minutes:startTime.minutes
            }
            ,endTime:{
                hours:endTime.hours,
                minutes:endTime.minutes
            }}
        console.log(day)
        console.log(startTime)
        console.log(endTime)
        const checkingSlotAccordingToDay=await timeSlotModel.find({day:day})
        console.log(checkingSlotAccordingToDay)
        if(checkingSlotAccordingToDay.length<1){
            const createTimeSlot = await timeSlotModel.create(data)
            console.log(createTimeSlot)
            if(!createTimeSlot){
                console.log("Time Slot not Created")
                return res.status(401).json({message:"Time Slot not Created"})
            }
            console.log("Time Slot Created")
            return res.status(201).json({message:"Time Slot Created Successfully",createTimeSlot})
        }

        // convert hours and mints in a single unit
        let totalStartTime = ((startTime.hours)*60)+startTime.minutes
        let totalEndTime=((endTime.hours)*60)+endTime.minutes
        console.log("Total Start Time",totalStartTime)
        console.log("Total End Time",totalEndTime)
        let totalTimeArray=checkingSlotAccordingToDay.map((currentElement,currentIndex)=>{
           let totalStartTime=currentElement.startTime.hours*60 + currentElement.startTime.minutes
            let totalEndTime =currentElement.endTime.hours*60 + currentElement.endTime.minutes
           let totalTimeObject = {totalStartTime,totalEndTime}
           return totalTimeObject
        })
        // let endTimeArray=checkingSlotAccordingToDay.map((currentElement,currentIndex)=>{
        //     return currentElement.endTime.hours*60 + currentElement.endTime.minutes
        // })
        // for(let i=0;i<totalTimeArray.length;i++){
        //     if(totalStartTime>=totalTimeArray.totalStartTime && totalEndTime<=totalTimeArray.totalEndTime){
        //         console.log('Overlapping Issue')
        //         break
        //     }
        //     else{
        //         console.log("No Overlapping")
        //     }
        // }
           let checkOverlapping = totalTimeArray.some((currentElement,currentIndex)=>{
                        if(totalStartTime <= currentElement.totalEndTime && totalEndTime >= currentElement.totalStartTime){
                            console.log("Overlapping",currentIndex)
                            return true
                        }
                        else{
                            return false
                        }

           })
if(checkOverlapping){
    return res.status(203).json({message:"Overlapping issue"})
}
console.log(checkOverlapping)
const newSlotCreation=await timeSlotModel.create(data)
if(!newSlotCreation){
    console.log('Issue in Creating New Slot')
    return res.status(402).json({message:"Issue in Creating New Slots"})
}
    console.log("New Slot Created")
    return res.status(200).json({message:"New Slot Created Successfully",newSlotCreation})
        
    } catch (error) {
        console.log("Error in Function of Time Slot Creation",error)
        return res.status(404).json({message:"Error in Time Slot Creation Function"})
    }
}

const updationInTimeSlots=async(req,res)=>{
    try { 
    const {id}= req.params
    const {day,startTime,endTime}=req.body
        const data ={day:day,
            startTime:{
                hours:startTime.hours,
                minutes:startTime.minutes
            }
            ,endTime:{
                hours:endTime.hours,
                minutes:endTime.minutes
            }}
        console.log(day)
        console.log(startTime)
        console.log(endTime) 
        const checkingSlotAccordingToDay=await timeSlotModel.find({day:day})
        console.log(checkingSlotAccordingToDay)
        if(checkingSlotAccordingToDay.length<1){
           const updateTimeSlot = await timeSlotModel.findByIdAndUpdate(id,data,{new:true})
            if(!updateTimeSlot){
                console.log("Time Slot not Updated")
                return res.status(401).json({message:"Time Slot not updated"})
            }
            console.log("Time Slot Updated")
            return res.status(201).json({message:"Time Slot Updating Successfully",updateTimeSlot})
        }

        // convert hours and mints in a single unit
        let totalStartTime = ((startTime.hours)*60)+startTime.minutes
        let totalEndTime=((endTime.hours)*60)+endTime.minutes
        console.log("Total Start Time",totalStartTime)
        console.log("Total End Time",totalEndTime)
        let totalTimeArray=checkingSlotAccordingToDay.map((currentElement,currentIndex)=>{
           let totalStartTime=currentElement.startTime.hours*60 + currentElement.startTime.minutes
            let totalEndTime =currentElement.endTime.hours*60 + currentElement.endTime.minutes
           let totalTimeObject = {totalStartTime,totalEndTime}
           return totalTimeObject
        })
           let checkOverlapping = totalTimeArray.some((currentElement,currentIndex)=>{
                        if(totalStartTime <= currentElement.totalEndTime && totalEndTime >= currentElement.totalStartTime){
                            console.log("Overlapping",currentIndex)
                            return true
                        }
                        else{
                            return false
                        }

           })
if(checkOverlapping){
    return res.status(203).json({message:"Overlapping issue"})
}
console.log(checkOverlapping)
const newTimeSlotUpdation=await timeSlotModel.findByIdAndUpdate(id,data,{new:true})
if(!newTimeSlotUpdation){
    console.log('Issue in Updating New Slot')
    return res.status(402).json({message:"Issue in Updating New Slots"})
}
    console.log("New Slot Updating")
    return res.status(200).json({message:"New Slot Updated Successfully",newTimeSlotUpdation})
}    
    catch (error) {
    console.log("Error in Time Slot Updation Function",error)
    return res.status(404).json({message:"issue in Time Slot Updation",error})    
    }
}

const deleteTimeSlot = async(req,res)=>{
    try {
        const {id}= req.body
        const deletionOfSlot =await timeSlotModel.findByIdAndDelete(id)
        if(!deletionOfSlot){
            console.log("Issue in Deleting Time Slot")
            return res.status(400).json({message:"Issue in Deleting Time Slot"})
        }
        console.log("Time Slot Deleted")
        return res.status(200).json({message:"Time Slot Deleted Successfully"})
    } catch (error) {
        console.log("Error in Deleting Time Slot")
        return res.status(404).json({message:"Error in Deleting Time Slot Function",error})
    }
}
module.exports={timeSlotCreation,updationInTimeSlots,deleteTimeSlot}