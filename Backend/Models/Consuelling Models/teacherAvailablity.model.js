const mongoose = require("mongoose")

const teacherAvailabilitySchema = new mongoose.Schema({

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

  date: {
    type: Date,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  isBooked: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true })

const teacherAvailabilityModel =   mongoose.model("teacherAvailabilityModel", teacherAvailabilitySchema)
module.exports = teacherAvailabilityModel
 