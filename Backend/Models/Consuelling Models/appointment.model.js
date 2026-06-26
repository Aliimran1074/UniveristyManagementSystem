const mongoose = require("mongoose")

const appointmentRequestSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instituteModel",
      required: true
    },

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

    performanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentSubjectPerformanceModel",
      required: true
    },

    appointmentDate: {
      type: Date
    },

    startTime: {
      type: String
    },

    endTime: {
      type: String
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled"
      ],
      default: "pending"
    },

    reason: {
      type: String,
      default: "Low Academic Performance"
    },

    retryAfter: {
      type: Date,
      default: Date.now
    },

    teacherRemarks: {
      type: String,
      default: ""
    },

    studentSeen: {
      type: Boolean,
      default: false
    },

    teacherSeen: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const appointmentRequestModel = mongoose.model("appointmentRequestModel",appointmentRequestSchema)

module.exports = appointmentRequestModel