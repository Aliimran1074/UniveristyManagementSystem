import {
  BookOpen,
  ClipboardList,
  Award,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react'

export default function Dashboard({
  studentData,
  averagePercentage,
  needsCounseling,
  onNavigate
}) {
  // Add safe defaults
  const grades = studentData?.grades ?? [];

  const passingGrades = grades.filter(
    g => (g.score / g.total) * 100 >= 50
  ).length;

  const failingGrades = grades.filter(
    g => (g.score / g.total) * 100 < 50
  ).length;

  return (
    <div className="space-y-6">
      {/* Alert for counseling */}
      {needsCounseling && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-red-900">
              Action Required: Counseling Recommended
            </h3>
            <p className="text-red-700 mt-1">
              Your average score is below 50%. Please schedule a meeting with an
              instructor or counseling agent to improve your performance.
            </p>
            <button
              onClick={() => onNavigate('counseling')}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Schedule Counseling Session
            </button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Average Score</p>
              <p
                className={`text-2xl mt-1 ${
                  averagePercentage >= 50
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {averagePercentage?.toFixed(1) ?? '0'}%
              </p>
            </div>
            {averagePercentage >= 50 ? (
              <TrendingUp className="w-8 h-8 text-green-600" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-600" />
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Assessments</p>
              <p className="text-2xl text-gray-900 mt-1">
                {grades.length}
              </p>
            </div>
            <ClipboardList className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Passing Grades</p>
              <p className="text-2xl text-green-600 mt-1">
                {passingGrades}
              </p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Need Improvement</p>
              <p className="text-2xl text-red-600 mt-1">
                {failingGrades}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('content')}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow text-left"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-gray-900">View Content</h3>
            <p className="text-gray-600 mt-1">Access course materials</p>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow text-left"
          >
            <ClipboardList className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-gray-900">Take Quiz</h3>
            <p className="text-gray-600 mt-1">Complete assignments</p>
          </button>

          <button
            onClick={() => onNavigate('grading')}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow text-left"
          >
            <Award className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-gray-900">Check Grades</h3>
            <p className="text-gray-600 mt-1">View your performance</p>
          </button>

          <button
            onClick={() => onNavigate('counseling')}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow text-left relative"
          >
            <MessageCircle className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="text-gray-900">Counseling</h3>
            <p className="text-gray-600 mt-1">Schedule meetings</p>
            {needsCounseling && (
              <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Recent Grades */}
      <div>
        <h2 className="text-gray-900 mb-4">Recent Assessments</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Percentage
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {grades
                  .slice(-5)
                  .reverse()
                  .map((grade, index) => {
                    const percentage =
                      (grade.score / grade.total) * 100;

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900">
                          {grade.subject}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {grade.type}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {grade.score}/{grade.total}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={
                              percentage >= 50
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {percentage.toFixed(0)}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {percentage >= 50 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                              Pass
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                              Needs Improvement
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
