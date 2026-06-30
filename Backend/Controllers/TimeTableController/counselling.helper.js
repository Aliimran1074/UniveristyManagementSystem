const timeTableModel = require("../../Models/TimeSlot/instituteTImeTable.model")

const findTeacherFreeSlot = async (teacherId) => {

  const workingDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ]

  const slots = [
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "11:00", end: "12:00" },
    { start: "12:00", end: "13:00" }
  ]

  for (const day of workingDays) {

    const teacherClasses = await timeTableModel.find({
      teacherId,
      day
    })

    for (const slot of slots) {

      const occupied = teacherClasses.find(item =>
        item.startTime === slot.start &&
        item.endTime === slot.end
      )

      if (!occupied) {

        return {
          day,
          startTime: slot.start,
          endTime: slot.end
        }

      }

    }

  }

  return null

}

module.exports = { findTeacherFreeSlot }