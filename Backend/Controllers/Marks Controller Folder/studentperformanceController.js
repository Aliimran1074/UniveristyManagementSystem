const studentSubjectPerformanceModel =require("../../Models/ResultModels/StudentPerSubjectPerformance.model")

const updateStudentPerformance = async (
  studentId,
  courseId,
  instituteId,
  teacherId
) => {

  const record =
    await studentSubjectPerformanceModel.findOne({
      studentId,
      courseId,
      instituteId,
      teacherId
    })

  if (!record) return

  // 1. CALCULATE TOTALS
  record.overallObtained =
    record.quizObtainedMarks +
    record.assignmentObtainedMarks +
    record.manualObtainedMarks +
    record.examObtainedMarks

  record.overallTotal =
    record.quizTotalMarks +
    record.assignmentTotalMarks +
    record.manualTotalMarks +
    record.examTotalMarks

  // 2. PERCENTAGE
  const percentage =
    record.overallTotal > 0
      ? (record.overallObtained / record.overallTotal) * 100
      : 0

  record.percentage = percentage

  // 3. STATUS FIX (MAIN ISSUE SOLVED HERE)
  if (percentage >= 70) {
    record.status = "good"
  } else if (percentage >= 40) {
    record.status = "average"
  } else {
    record.status = "weak"
  }

  // 4. TIMESTAMP
  record.lastUpdated = new Date()

  await record.save()

  return record
}

module.exports = { updateStudentPerformance }