const mongoose = require("mongoose")

const timeTableSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instituteModel",
      required: true
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departmentModel"
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseModel",
      required: true
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staffModel",
      required: true
    },

    batch: {
      type: String
    },

    semester: {
      type: Number
    },

    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)


const timeTableModel = mongoose.model(  "timeTableModel",timeTableSchema)
module.exports = timeTableModel