const appointmentModel = require("../../../Models/Consuelling Models/appointment.model")

const acceptAppointment = async (req, res) => {

  try {

    const { appointmentId } = req.body

    const appointment = await appointmentModel.findById(appointmentId)

    if (!appointment) {
      return res.status(404).json({ message: "Not found" })
    }

    appointment.status = "accepted"
    await appointment.save()

    return res.status(200).json({
      message: "Appointment Accepted",
      appointment
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const rejectAppointment = async (req, res) => {

  try {

    const { appointmentId, remarks } = req.body

    const appointment = await appointmentModel.findById(appointmentId)

    if (!appointment) {
      return res.status(404).json({ message: "Not found" })
    }

    appointment.status = "rejected"
    appointment.teacherRemarks = remarks || "Not available"

    // retry after 3 days
    const retryDate = new Date()
    retryDate.setDate(retryDate.getDate() + 3)

    appointment.retryAfter = retryDate

    await appointment.save()

    return res.status(200).json({
      message: "Appointment Rejected",
      appointment
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { acceptAppointment,rejectAppointment }
