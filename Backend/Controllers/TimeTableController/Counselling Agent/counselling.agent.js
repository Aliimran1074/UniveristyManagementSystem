const studentSubjectPerformanceModel = require("../../../Models/ResultModels/StudentPerSubjectPerformance.model")
const appointmentRequestModel = require("../../../Models/Consuelling Models/appointment.model")
const { findTeacherFreeSlot } = require("../counselling.helper.js")

const runCounsellingAgent = async () => {

  try {
    console.log("Counselling Agent Running...")
    const students = await studentSubjectPerformanceModel.find({
      overallTotal: { $gte: 30 },
      percentage: { $lt: 50 }
    })
    if (!students.length) {
      console.log("No student needs counselling")
      return
    }
    for (const student of students) {
      const alreadyPending =
        await appointmentRequestModel.findOne({
          studentId: student.studentId,
          courseId: student.courseId,
          status: {
            $in: ["pending", "accepted"]
          }
        })
      if (alreadyPending) {
        continue
      }
      const slot =
        await findTeacherFreeSlot(student.teacherId)
      if (!slot) {
        console.log(
          "No free slot available for teacher",
          student.teacherId
        )
        continue
      }

      const appointmentDate = new Date()

      await appointmentRequestModel.create({

        instituteId: student.instituteId,

        studentId: student.studentId,

        teacherId: student.teacherId,

        courseId: student.courseId,

        performanceId: student._id,

        appointmentDate,

        startTime: slot.startTime,

        endTime: slot.endTime,

        reason: "Student performance below 50% after completing at least 30 marks."

      })

      console.log(
        "Appointment Created For Student :",
        student.studentId
      )

    }

    console.log("Counselling Agent Completed")

  }

  catch (error) {

    console.log(
      "Counselling Agent Error",
      error.message
    )

  }

}

module.exports = { runCounsellingAgent }