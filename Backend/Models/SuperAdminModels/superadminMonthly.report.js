// in this file we will create SuperAdmin Monthly Report Schema Structure


// We will re check this schema 
const mongoose = require('mongoose');

const monthlyReportSchema = new mongoose.Schema({
  
  // 🏫 Institute / User
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
    index: true
  },

  // 🔖 Subscription Plan Reference
  subscriptionPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscriptionPlanModel',
    required: true
  },

  // 📆 Month & Year of report
  reportMonth: { type: Number, required: true }, // 1-12
  reportYear: { type: Number, required: true },

  // =========================
  // 1️⃣ Subscription Snapshot
  // =========================
  subscriptionSnapshot: {
    planName: { type: String, required: true },
    price: { type: Number, default: 0 },
    durationDays: { type: Number, default: 365 },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    remainingDays: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'expiring_soon', 'expired'],
      default: 'active'
    }
  },

  // =========================
  // 2️⃣ AI Usage Analytics
  // =========================
  aiUsage: {
    enabled: { type: Boolean, default: false },
    assignmentGeneratorUsed: { type: Number, default: 0 },
    quizGeneratorUsed: { type: Number, default: 0 },
    examGeneratorUsed: { type: Number, default: 0 },
    contentGeneratorUsed: { type: Number, default: 0 },
    autoCheckerUsed: { type: Number, default: 0 },
    totalAiRequests: { type: Number, default: 0 }
  },

  // =========================
  // 3️⃣ Institute / Activity Stats
  // =========================
  activityStats: {
    totalClassesCreated: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },
    totalAssignmentsUploaded: { type: Number, default: 0 },
    totalQuizzesUploaded: { type: Number, default: 0 },
    totalExamsUploaded: { type: Number, default: 0 },
    attendanceRecords: { type: Number, default: 0 }
  },

  // =========================
  // 4️⃣ Billing Info
  // =========================
  billing: {
    amountPaid: { type: Number, default: 0 },
    billingCycle: { type: String, enum: ['monthly', 'yearly', 'multi-year'], default: 'yearly' },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], default: 'paid' }
  },

  // =========================
  // 5️⃣ Alerts / Notifications
  // =========================
  alerts: {
    nearingExpiry: { type: Boolean, default: false },
    aiLimitReached: { type: Boolean, default: false },
    inactiveInstitute: { type: Boolean, default: false },
    overUsageDetected: { type: Boolean, default: false }
  },

  // =========================
  // 6️⃣ Recommended Actions
  // =========================
  recommendedActions: [{
    type: {
      type: String,
      enum: ['upgrade_plan', 'renew_subscription', 'send_warning', 'increase_ai_limits', 'contact_institute', 'no_action'],
      required: true
    },
    message: { type: String }
  }],

  // =========================
  // 7️⃣ Report meta
  // =========================
  generatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

// Prevent duplicate monthly report per institute
monthlyReportSchema.index({ instituteId: 1, reportMonth: 1, reportYear: 1 }, { unique: true });

module.exports = mongoose.model('MonthlyReport', monthlyReportSchema);
