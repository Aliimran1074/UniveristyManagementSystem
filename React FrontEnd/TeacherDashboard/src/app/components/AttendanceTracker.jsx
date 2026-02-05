import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Check, X, Clock, TrendingUp } from 'lucide-react';

export default function AttendanceTracker({ teacherData }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('9-bio');
  const [attendanceData, setAttendanceData] = useState({
    '9-bio': [
      { id: 1, name: 'John Smith', rollNo: '901', status: 'present' },
      { id: 2, name: 'Emma Wilson', rollNo: '902', status: 'present' },
      { id: 3, name: 'Michael Brown', rollNo: '903', status: 'absent' },
      { id: 4, name: 'Sarah Davis', rollNo: '904', status: 'present' },
      { id: 5, name: 'James Johnson', rollNo: '905', status: 'present' },
      { id: 6, name: 'Emily Martinez', rollNo: '906', status: 'present' },
      { id: 7, name: 'Daniel Garcia', rollNo: '907', status: 'late' },
      { id: 8, name: 'Olivia Rodriguez', rollNo: '908', status: 'present' },
    ],
    '10-chem': [
      { id: 9, name: 'William Lee', rollNo: '1001', status: 'present' },
      { id: 10, name: 'Sophia Anderson', rollNo: '1002', status: 'present' },
      { id: 11, name: 'Benjamin Taylor', rollNo: '1003', status: 'present' },
      { id: 12, name: 'Ava Thomas', rollNo: '1004', status: 'present' },
      { id: 13, name: 'Lucas White', rollNo: '1005', status: 'absent' },
      { id: 14, name: 'Mia Harris', rollNo: '1006', status: 'present' },
      { id: 15, name: 'Henry Clark', rollNo: '1007', status: 'present' },
      { id: 16, name: 'Charlotte Lewis', rollNo: '1008', status: 'present' },
    ]
  });

  // Teacher's attendance history
  const teacherAttendance = [
    { date: '2026-02-04', status: 'present', classes: 2 },
    { date: '2026-02-03', status: 'present', classes: 2 },
    { date: '2026-02-02', status: 'present', classes: 1 },
    { date: '2026-02-01', status: 'present', classes: 2 },
    { date: '2026-01-31', status: 'present', classes: 2 },
    { date: '2026-01-30', status: 'present', classes: 2 },
    { date: '2026-01-29', status: 'present', classes: 2 },
  ];

  const currentStudents = attendanceData[selectedClass];
  const presentCount = currentStudents.filter(s => s.status === 'present').length;
  const absentCount = currentStudents.filter(s => s.status === 'absent').length;
  const lateCount = currentStudents.filter(s => s.status === 'late').length;

  const toggleAttendance = (studentId) => {
    setAttendanceData(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map(student => {
        if (student.id === studentId) {
          const nextStatus = student.status === 'present' ? 'absent' : 
                           student.status === 'absent' ? 'late' : 'present';
          return { ...student, status: nextStatus };
        }
        return student;
      })
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700 border-green-300';
      case 'absent': return 'bg-red-100 text-red-700 border-red-300';
      case 'late': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Teacher Attendance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Your Attendance Record
          </CardTitle>
          <CardDescription>Track your teaching attendance and schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="flex flex-wrap gap-2">
                {teacherAttendance.map((record, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      record.status === 'present' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {record.status === 'present' ? (
                        <Check className="w-6 h-6 text-green-600" />
                      ) : (
                        <X className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                      {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs text-gray-500">{record.classes} classes</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Attendance Rate</span>
                </div>
                <p className="text-3xl font-bold text-green-600">100%</p>
                <p className="text-sm text-green-700 mt-1">Last 30 days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Attendance Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Student Attendance</CardTitle>
          <CardDescription>Mark and track student attendance for each class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Class and Date Selector */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Class</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedClass('9-bio')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedClass === '9-bio'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Class 9 - Biology
                  </button>
                  <button
                    onClick={() => setSelectedClass('10-chem')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedClass === '10-chem'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Class 10 - Chemistry
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 mb-1">Present</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700 mb-1">Absent</p>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700 mb-1">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
              </div>
            </div>

            {/* Student List */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Roll No</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student Name</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentStudents.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{student.rollNo}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={`${getStatusColor(student.status)} border`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleAttendance(student.id)}
                          className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Save Attendance
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
