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

  for (const course of courses) {

    const teacherId = course.instructorTeached

    const existing = await timeTableModel.findOne({
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

    await timeTableModel.create({
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
    message: "TimeTable Generated Successfully"
  }
}



// humay is function ko postman k through test karna hoga
module.exports = { generateTimeTable }