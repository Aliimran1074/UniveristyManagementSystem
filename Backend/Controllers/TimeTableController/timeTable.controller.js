const courseModel = require('../../Models/CourseModels/course.model')
const timeSlotModel = require('../../Models/TimeSlot/timeSlot.model')
const timeTableModel= require('../../Models/TimeSlot/timetable.models')




// time slots(9 to 3) total hours (41 in week by subracting 1 namaz for friday)
// total 16 subject per department (9 of 3 credit hours and 7 of 2 credit hours)
// each semester should has minimum 2 subjects
// Prefer to assign semester 7 and 8 classes in between 9 to 1
// make 1 day free for every semester students in between monday to saturday
const timeTableCreation = async(req,res)=>{
    try {
        const {departmentId}= req.params
        const getCoursesOfParticularDepartment = await courseModel.find({department:departmentId})
        // return res.status(200).json({message:'Courses of Particular Department',getCoursesOfParticularDepartment})
        
        // sorting of array according to their semester no in descending order (8 to 1)
        for(let i=0;i<getCoursesOfParticularDepartment.length;i++){
            for(let j =i+1; j<getCoursesOfParticularDepartment.length;j++){
                if(getCoursesOfParticularDepartment[i].ForSemester<getCoursesOfParticularDepartment[j].ForSemester){
                    let temp = getCoursesOfParticularDepartment[i]
                    getCoursesOfParticularDepartment[i] =getCoursesOfParticularDepartment[j]
                    getCoursesOfParticularDepartment[j]=temp  
                    
                }
            }
        }
        const allTimeSlot = await timeSlotModel.find()
        // return res.status(200).json({message:"All time Slots",allTimeSlot})

        const dayNumber ={
            "monday":1,
            "tuesday":2,
            "wednesday":3,
            "thursday":4,
            "friday":5,
            "saturday":6
        }

// 10-1=9
// 10-1-1=8

for (let pass = 0; pass < allTimeSlot.length - 1; pass++) {   // multiple passes 
  for (let i = 0; i < allTimeSlot.length - 1 - pass; i++) {   // inner comparison
    let dayI = dayNumber[allTimeSlot[i].day.toLowerCase()];
    let dayJ = dayNumber[allTimeSlot[i + 1].day.toLowerCase()];

    let shouldSwap = false;  //flag variable

    // Compare by day
    if (dayI > dayJ) {
      shouldSwap = true;
    }
    // If same day → compare startTime
    else if (dayI === dayJ) {
      if (Number(allTimeSlot[i].startTime) > Number(allTimeSlot[i + 1].startTime)) {
        shouldSwap = true;
      }
    }

    if (shouldSwap) {
      let temp = allTimeSlot[i];
      allTimeSlot[i] = allTimeSlot[i + 1];
      allTimeSlot[i + 1] = temp;
    }
  }
}

        return res.status(200).json({message:"Array Sorted Successfully",allTimeSlot})

        //         for (let i=0;i<allTimeSlot.length;i++){
//             for(j=i+1;j<allTimeSlot.length;j++){
               
//                 if(Number(allTimeSlot[i].startTime)>Number(allTimeSlot[j].startTime)){
//                     let temp=allTimeSlot[i]
//                     allTimeSlot[i]=allTimeSlot[j]
//                     allTimeSlot[j]=temp 
                
//                 }
//                 if(dayNumber[allTimeSlot[i].day.toLowerCase()]> dayNumber[allTimeSlot[j].day.toLowerCase()]){
                 
//                     let temp = allTimeSlot[i]
//                     allTimeSlot[i]=allTimeSlot[j]
//                     allTimeSlot[j]=temp
                
//                     if(Number(allTimeSlot[i].startTime)>Number(allTimeSlot[j].startTime)){
//                     let temp=allTimeSlot[i]
//                     allTimeSlot[i]=allTimeSlot[j]
//                     allTimeSlot[j]=temp 
                
//                 }
//                 }
        
        
//             }
//         }
// // Arrange according to time
//         for (let i =0;i<allTimeSlot.length;i++){
//             for(j=i+1;j<allTimeSlot.length;j++){
//                 if(Number(allTimeSlot[i].startTime)>Number(allTimeSlot[j].startTime)){
//                     let temp=allTimeSlot[i]
//                     allTimeSlot[i]=allTimeSlot[j]
//                     allTimeSlot[j]=temp 
                
//                 }
//             }
//         }
      
    } catch (error) {
    console.log("Issue in Time Table Creation Function",error)
    return res.status(404).json({message:"Issue in Time Table Creation Function",error})        
    }
}

module.exports={timeTableCreation}