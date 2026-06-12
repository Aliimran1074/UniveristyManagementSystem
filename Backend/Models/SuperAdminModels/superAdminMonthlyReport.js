const mongoose = require("mongoose");

const superAdminMonthlyReportSchema = new mongoose.Schema(
  {
    //  Report period
    month: {
      type: Number, // 1-12
      required: true,
      min: 1,
      max: 12
    },

    year: {
      type: Number,
      required: true
    },

    //  Institute Stats
    totalInstitutes: {
      type: Number,
      default: 0
    },

    activeInstitutes: {
      type: Number,
      default: 0
    },

    expiredInstitutes: {
      type: Number,
      default: 0
    },

    newInstitutesThisMonth: {
      type: Number,
      default: 0
    },

    //  Users Stats
    totalStudents: {
      type: Number,
      default: 0
    },

    totalStaff: {
      type: Number,
      default: 0
    },

    //  Revenue
    totalRevenue: {
      type: Number,
      default: 0
    },

    //  AI Usage (ALL SYSTEM)
    aiUsage: {
      totalAiRequests: { type: Number, default: 0 },

      assignmentGeneratorUsed: { type: Number, default: 0 },
      quizGeneratorUsed: { type: Number, default: 0 },
      examGeneratorUsed: { type: Number, default: 0 },
      contentGeneratorUsed: { type: Number, default: 0 },

      assignmentCheckerUsed: { type: Number, default: 0 },
      quizCheckerUsed: { type: Number, default: 0 }
    },

    //  Activity Insights (optional but powerful)
    activityStats: {
      totalLogins: { type: Number, default: 0 },
      totalAssignmentsCreated: { type: Number, default: 0 },
      totalQuizzesCreated: { type: Number, default: 0 },
      totalExamsCreated: { type: Number, default: 0 }
    },

    //  PDF Report link
    reportPdf: {
      type: String,
      default: ""
    },

    //  Status flags (dashboard ke liye useful)
    insights: {
      mostActiveInstitute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institute"
      },

      topAIFeature: {
        type: String
      },

      growthPercentage: {
        type: Number,
        default: 0
      }
    }
  },
  { timestamps: true }
)

//  prevent duplicate monthly report
superAdminMonthlyReportSchema.index(
  { month: 1, year: 1 },
  { unique: true }
)

const superAdminMonthlyReportModel= mongoose.model("superAdminMonthlyReport",superAdminMonthlyReportSchema)

module.exports = superAdminMonthlyReportModel 