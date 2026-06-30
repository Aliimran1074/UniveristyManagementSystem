const appointmentModel = require("../../../Models/Consuelling Models/appointment.model")


const getStudentAppointments = async (req, res) => {

  try {

    const { studentId } = req.params

    const appointments = await appointmentModel.find({
      studentId
    }).populate("teacherId courseId")

    return res.status(200).json({
      appointments
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { getStudentAppointments }