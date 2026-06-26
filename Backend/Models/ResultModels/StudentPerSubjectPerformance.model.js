const mongoose = require('mongoose')

const studentSubjectPerformanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'studentRegistrationModel',
      required: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courseModel',
      required: true
    },

    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'instituteModel',
      required: true
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'staffModel',
      required: true
    },

    quizObtainedMarks: { type: Number, default: 0 },
    quizTotalMarks: { type: Number, default: 0 },

    assignmentObtainedMarks: { type: Number, default: 0 },
    assignmentTotalMarks: { type: Number, default: 0 },

    manualObtainedMarks: { type: Number, default: 0 },
    manualTotalMarks: { type: Number, default: 0 },

    examObtainedMarks: { type: Number, default: 0 },
    examTotalMarks: { type: Number, default: 0 },

    overallObtained: { type: Number, default: 0 },
    overallTotal: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ['good', 'average', 'weak'],
      default: 'average'
    },

    lastUpdated: {
      type: Date,
      default: Date.now
    },
    counsellingRequested: {
  type: Boolean,
  default: false
},

counsellingRequestedAt: {
  type: Date,
  default: null
}
  },
  { timestamps: true }
)

const studentSubjectPerformanceModel = mongoose.model('studentSubjectPerformanceModel',studentSubjectPerformanceSchema)

module.exports = studentSubjectPerformanceModel