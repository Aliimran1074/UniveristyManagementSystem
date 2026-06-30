const appointmentModel = require("../../../Models/Consuelling Models/appointment.model")

const runRetryAgent = async () => {

  try {

    console.log("Retry Agent Running...")

    const now = new Date()

    const pendingRetries = await appointmentModel.find({
      status: "rejected",
      retryAfter: { $lte: now }
    })

    if (!pendingRetries.length) {
      console.log("No retry appointments")
      return
    }

    for (const app of pendingRetries) {

      app.status = "pending"
      app.teacherRemarks = ""
      app.retryAfter = null

      await app.save()

      console.log("Re-sent appointment:", app._id)
    }

  } catch (error) {
    console.log("Retry Agent Error:", error.message)
  }
}

module.exports = { runRetryAgent }