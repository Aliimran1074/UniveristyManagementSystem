import {
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';

export default function Grading({ grades }) {
  const calculateAverage = () => {
    const total = grades.reduce(
      (sum, grade) => sum + (grade.score / grade.total) * 100,
      0
    );
    return total / grades.length;
  };

  const averagePercentage = calculateAverage();

  const getGradesBySubject = () => {
    const subjectGrades = {};

    grades.forEach(grade => {
      if (!subjectGrades[grade.subject]) {
        subjectGrades[grade.subject] = { scores: [], total: 0 };
      }
      const percentage = (grade.score / grade.total) * 100;
      subjectGrades[grade.subject].scores.push(percentage);
      subjectGrades[grade.subject].total += percentage;
    });

    return Object.entries(subjectGrades).map(([subject, data]) => ({
      subject,
      average: data.total / data.scores.length,
      count: data.scores.length
    }));
  };

  const subjectAverages = getGradesBySubject();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Your Grades</h2>
        <p className="text-gray-600 mt-1">
          Track your academic performance
        </p>
      </div>

      {/* Overall Performance */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-900">Overall Performance</h3>
            <p className="text-gray-600 mt-1">
              Your average across all subjects
            </p>
          </div>

          <div className="text-right">
            <div
              className={`text-4xl ${
                averagePercentage >= 50
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {averagePercentage.toFixed(1)}%
            </div>

            <div className="flex items-center justify-end gap-1 mt-1">
              {averagePercentage >= 50 ? (
                <>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-green-600">
                    Above Threshold
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span className="text-red-600">
                    Below Threshold
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all ${
              averagePercentage >= 50
                ? 'bg-green-600'
                : 'bg-red-600'
            }`}
            style={{ width: `${Math.min(averagePercentage, 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-gray-600">
          <span>0%</span>
          <span className="text-orange-600">
            50% (Threshold)
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-900">
            Subject Performance
          </h3>
        </div>

        <div className="space-y-4">
          {subjectAverages.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">
                    {subject.subject}
                  </span>
                  <span className="text-gray-600">
                    ({subject.count} assessment
                    {subject.count > 1 ? 's' : ''})
                  </span>
                </div>
                <span
                  className={
                    subject.average >= 50
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {subject.average.toFixed(1)}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    subject.average >= 50
                      ? 'bg-green-600'
                      : 'bg-red-600'
                  }`}
                  style={{
                    width: `${Math.min(subject.average, 100)}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Grades Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" />
            <h3 className="text-gray-900">
              All Assessments
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">#</th>
                <th className="px-6 py-3 text-left text-gray-600">Subject</th>
                <th className="px-6 py-3 text-left text-gray-600">Type</th>
                <th className="px-6 py-3 text-left text-gray-600">Score</th>
                <th className="px-6 py-3 text-left text-gray-600">Percentage</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Grade</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {grades.map((grade, index) => {
                const percentage = (grade.score / grade.total) * 100;

                let letterGrade = 'F';
                if (percentage >= 90) letterGrade = 'A';
                else if (percentage >= 80) letterGrade = 'B';
                else if (percentage >= 70) letterGrade = 'C';
                else if (percentage >= 60) letterGrade = 'D';

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {grade.subject}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${
                          grade.type === 'Quiz'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {grade.type}
                      </span>
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
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600">
                          <TrendingDown className="w-4 h-4" />
                          Below Threshold
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          letterGrade === 'A'
                            ? 'bg-green-100 text-green-800'
                            : letterGrade === 'B'
                            ? 'bg-blue-100 text-blue-800'
                            : letterGrade === 'C'
                            ? 'bg-yellow-100 text-yellow-800'
                            : letterGrade === 'D'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {letterGrade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
