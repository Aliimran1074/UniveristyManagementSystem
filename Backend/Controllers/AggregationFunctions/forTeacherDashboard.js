const mongoose = require("mongoose")

const courseModel = require("../../Models/CourseModels/course.model")
const staffModel = require("../../Models/UserModels/staff.model")
const studentModel = require("../../Models/UserModels/studentRegistration.model")
const appointmentModel = require("../../Models/Consuelling Models/appointment.model")
const quizModel = require("../../Models/QuizModel/quiz.model")
const quizUploadModel = require("../../Models/QuizModel/quizUploading.model")
const assignmentModel = require("../../Models/Assignment/assignment.model")
const assignmentUploadModel = require("../../Models/Assignment/assignmentUploading.model")
const courseContentModel = require("../../Models/CourseModels/courseContent.model")
const staffAttendanceModel = require("../../Models/Attendence/staffAttendence.model")

const teacherDashboardInfo = async (req, res) => {
  try {
    const { teacherId } = req.params
    const teacherObjectId = new mongoose.Types.ObjectId(teacherId)

    // =========================
    // 1. COURSES BASE DATA
    // =========================
    const courses = await courseModel.aggregate([
      {
        $match: { instructorTeached: teacherObjectId }
      },

      // teacher
      {
        $lookup: {
          from: "staffmodels",
          localField: "instructorTeached",
          foreignField: "_id",
          as: "teacher"
        }
      },
      { $unwind: "$teacher" },

      // enrollments → students
      {
        $lookup: {
          from: "courseenrollmentmodels",
          localField: "_id",
          foreignField: "courseId",
          as: "enrollments"
        }
      },

      {
        $lookup: {
          from: "studentregistrationmodels",
          localField: "enrollments.studentId",
          foreignField: "_id",
          as: "students"
        }
      },

      // content
      {
        $lookup: {
          from: "coursecontentmodels",
          localField: "_id",
          foreignField: "courseId",
          as: "content"
        }
      },

      // appointments
      {
        $lookup: {
          from: "appointmentrequestmodels",
          localField: "_id",
          foreignField: "courseId",
          as: "appointments"
        }
      },

      {
        $project: {
          teacher: {
            _id: "$teacher._id",
            name: "$teacher.name",
            designation: "$teacher.designation",
            instituteId: "$teacher.instituteId"
          },

          course: {
            _id: "$_id",
            name: "$name",
            class: "$ForClass",
            semester: "$ForSemester"
          },

          students: {
            $map: {
              input: "$students",
              as: "s",
              in: {
                _id: "$$s._id",
                name: "$$s.name",
                status: "$$s.statusOfStudent"
              }
            }
          },

          totalStudents: { $size: "$students" },

          totalContent: { $size: "$content" },

          totalAppointments: { $size: "$appointments" },
          pendingAppointments: {
            $size: {
              $filter: {
                input: "$appointments",
                as: "a",
                cond: { $eq: ["$$a.status", "pending"] }
              }
            }
          }
        }
      }
    ])

    // =========================
    // 2. QUIZ STATS (FIXED)
    // =========================
    const quizStats = await quizModel.aggregate([
      {
        $match: { createdBy: teacherObjectId }
      },
      {
        $lookup: {
          from: "quizuploadingmodels",
          localField: "_id",
          foreignField: "quizId",
          as: "submissions"
        }
      },
      {
        $group: {
          _id: "$course",
          totalQuizzes: { $sum: 1 },
          totalSubmissions: { $sum: { $size: "$submissions" } },
          checkedSubmissions: {
            $sum: {
              $size: {
                $filter: {
                  input: "$submissions",
                  as: "s",
                  cond: { $eq: ["$$s.status", "checked"] }
                }
              }
            }
          }
        }
      }
    ])

    // =========================
    // 3. ASSIGNMENT STATS (FIXED)
    // =========================
    const assignmentStats = await assignmentModel.aggregate([
      {
        $match: { createdBy: teacherObjectId }
      },
      {
        $lookup: {
          from: "assignmentuploadingmodels",
          localField: "_id",
          foreignField: "assignmentId",
          as: "submissions"
        }
      },
      {
        $group: {
          _id: "$course",
          totalAssignments: { $sum: 1 },
          totalSubmissions: { $sum: { $size: "$submissions" } },
          checkedSubmissions: {
            $sum: {
              $size: {
                $filter: {
                  input: "$submissions",
                  as: "s",
                  cond: { $eq: ["$$s.status", "checked"] }
                }
              }
            }
          }
        }
      }
    ])

    // =========================
    // 4. STUDENTS GLOBAL
    // =========================
    const students = await studentModel.find({})

    // =========================
    // 5. APPOINTMENTS
    // =========================
    const appointments = await appointmentModel.find({
      teacherId: teacherObjectId
    })

    // =========================
    // 6. ATTENDANCE
    // =========================
    const attendanceStats = await staffAttendanceModel.find({
      staffId: teacherObjectId
    })

    // =========================
    // FINAL RESPONSE
    // =========================
    return res.json({
      teacher: courses[0]?.teacher || {},

      summary: {
        totalCourses: courses.length,
        totalStudents: students.length,
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(a => a.status === "pending").length,

        totalQuizzes: quizStats.reduce((a, b) => a + b.totalQuizzes, 0),
        totalQuizSubmissions: quizStats.reduce((a, b) => a + b.totalSubmissions, 0),
        checkedQuizSubmissions: quizStats.reduce((a, b) => a + b.checkedSubmissions, 0),

        totalAssignments: assignmentStats.reduce((a, b) => a + b.totalAssignments, 0),
        totalAssignmentSubmissions: assignmentStats.reduce((a, b) => a + b.totalSubmissions, 0),
        checkedAssignmentSubmissions: assignmentStats.reduce((a, b) => a + b.checkedSubmissions, 0),

        attendance: attendanceStats
      },

      courses,
      students,
      appointments,
      quizStats,
      assignmentStats,
      attendanceStats
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { teacherDashboardInfo }