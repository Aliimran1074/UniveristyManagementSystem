const mongoose = require("mongoose")

const courseTeacherMapSchema = new mongoose.Schema({

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instituteModel",
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courseModel",
    required: true
  },

  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staffModel",
    required: true
  },

  batch: {
    type: String,
    required: true
  },

  semester: {
    type: Number,
    required: true
  },

  isAssigned: {
    type: Boolean,
    default: true
  }

}, { timestamps: true })

const courseTeacherMapModel=   mongoose.model("courseTeacherMapModel", courseTeacherMapSchema)
module.exports = courseTeacherMapModel
