const instituteTimeTableModel =  require("../../Models/TimeSlot/instituteTImeTable.model")

const courseModel =require("../../Models/CourseModels/course.model")

const staffModel = require('../../Models/UserModels/staff.model')

const generateTimeTable = async (instituteId) => {

  const courses =
    await courseModel.find({
      instituteId,
      instructorTeached: { $ne: null }
    })

  const days =
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const slots = [
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "11:00", end: "12:00" },
    { start: "12:00", end: "13:00" }
  ]

  let dayIndex = 0
  let slotIndex = 0

  let createTimeTable 
  for (const course of courses) {

    const teacherId = course.instructorTeached

    const existing = await instituteTimeTableModel.findOne({
      teacherId,
      day: days[dayIndex],
      startTime: slots[slotIndex].start
    })

    if (existing) {
      slotIndex++
      if (slotIndex >= slots.length) {
        slotIndex = 0
        dayIndex++
      }
      continue
    }

    
   createTimeTable =  await instituteTimeTableModel.create({
      instituteId: course.instituteId,
      departmentId: course.department,
      courseId: course._id,
      teacherId,
      batch: course.ForClass,
      semester: course.ForSemester,
      day: days[dayIndex],
      startTime: slots[slotIndex].start,
      endTime: slots[slotIndex].end
    })

    slotIndex++
    if (slotIndex >= slots.length) {
      slotIndex = 0
      dayIndex++
    }
  }

  return {
    success: true,
    message: "TimeTable Generated Successfully",
    createTimeTable
  }
}


const checkGenerateTable = async(req,res)=>{
  try {
    const {instituteId} =req.body
    const result = await generateTimeTable(instituteId)
    console.log("Result is :",result)
    return res.status(200).json({message:"Final Result is :",result})
  } catch (error) {
    console.log("Error in Generate Time Table Function",error)
    return res.status(404).json({message:"Error in Generate Time Table Function",error})
  }
}

// humay is function ko postman k through test karna hoga
module.exports = { generateTimeTable ,checkGenerateTable}