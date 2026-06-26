const mongoose = require("mongoose")

const counsellingSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentRegistrationModel",
    required: true
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staffModel",
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courseModel",
    required: true
  },

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instituteModel",
    required: true
  },

  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacherAvailabilityModel"
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "rescheduled"],
    default: "pending"
  },

  reason: {
    type: String,
    default: "Low academic performance"
  },

  retryCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true })

const counsellingModel= mongoose.model("counsellingModel", counsellingSchema)
module.exports = counsellingModel
