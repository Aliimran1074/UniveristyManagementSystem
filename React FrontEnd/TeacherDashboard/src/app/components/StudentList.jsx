import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Mail, Phone, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StudentList({ teacherData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock student data
  const students = [
    // Class 9 Biology Students
    { id: 1, name: 'John Smith', class: '9', subject: 'Biology', rollNo: '901', email: 'john.smith@school.com', phone: '+1234567890', attendance: 92, avgGrade: 88, trend: 'up' },
    { id: 2, name: 'Emma Wilson', class: '9', subject: 'Biology', rollNo: '902', email: 'emma.wilson@school.com', phone: '+1234567891', attendance: 96, avgGrade: 94, trend: 'up' },
    { id: 3, name: 'Michael Brown', class: '9', subject: 'Biology', rollNo: '903', email: 'michael.brown@school.com', phone: '+1234567892', attendance: 88, avgGrade: 82, trend: 'down' },
    { id: 4, name: 'Sarah Davis', class: '9', subject: 'Biology', rollNo: '904', email: 'sarah.davis@school.com', phone: '+1234567893', attendance: 94, avgGrade: 90, trend: 'up' },
    { id: 5, name: 'James Johnson', class: '9', subject: 'Biology', rollNo: '905', email: 'james.johnson@school.com', phone: '+1234567894', attendance: 90, avgGrade: 85, trend: 'stable' },
    { id: 6, name: 'Emily Martinez', class: '9', subject: 'Biology', rollNo: '906', email: 'emily.martinez@school.com', phone: '+1234567895', attendance: 98, avgGrade: 96, trend: 'up' },
    { id: 7, name: 'Daniel Garcia', class: '9', subject: 'Biology', rollNo: '907', email: 'daniel.garcia@school.com', phone: '+1234567896', attendance: 85, avgGrade: 79, trend: 'down' },
    { id: 8, name: 'Olivia Rodriguez', class: '9', subject: 'Biology', rollNo: '908', email: 'olivia.rodriguez@school.com', phone: '+1234567897', attendance: 93, avgGrade: 87, trend: 'up' },
    
    // Class 10 Chemistry Students
    { id: 9, name: 'William Lee', class: '10', subject: 'Chemistry', rollNo: '1001', email: 'william.lee@school.com', phone: '+1234567898', attendance: 91, avgGrade: 86, trend: 'stable' },
    { id: 10, name: 'Sophia Anderson', class: '10', subject: 'Chemistry', rollNo: '1002', email: 'sophia.anderson@school.com', phone: '+1234567899', attendance: 97, avgGrade: 93, trend: 'up' },
    { id: 11, name: 'Benjamin Taylor', class: '10', subject: 'Chemistry', rollNo: '1003', email: 'benjamin.taylor@school.com', phone: '+1234567900', attendance: 89, avgGrade: 84, trend: 'up' },
    { id: 12, name: 'Ava Thomas', class: '10', subject: 'Chemistry', rollNo: '1004', email: 'ava.thomas@school.com', phone: '+1234567901', attendance: 95, avgGrade: 91, trend: 'up' },
    { id: 13, name: 'Lucas White', class: '10', subject: 'Chemistry', rollNo: '1005', email: 'lucas.white@school.com', phone: '+1234567902', attendance: 87, avgGrade: 80, trend: 'down' },
    { id: 14, name: 'Mia Harris', class: '10', subject: 'Chemistry', rollNo: '1006', email: 'mia.harris@school.com', phone: '+1234567903', attendance: 99, avgGrade: 97, trend: 'up' },
    { id: 15, name: 'Henry Clark', class: '10', subject: 'Chemistry', rollNo: '1007', email: 'henry.clark@school.com', phone: '+1234567904', attendance: 92, avgGrade: 88, trend: 'stable' },
    { id: 16, name: 'Charlotte Lewis', class: '10', subject: 'Chemistry', rollNo: '1008', email: 'charlotte.lewis@school.com', phone: '+1234567905', attendance: 94, avgGrade: 89, trend: 'up' },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.includes(searchQuery);
    const matchesClass = selectedClass === 'all' || 
                        (selectedClass === '9-bio' && student.class === '9' && student.subject === 'Biology') ||
                        (selectedClass === '10-chem' && student.class === '10' && student.subject === 'Chemistry');
    return matchesSearch && matchesClass;
  });

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Filter and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>View and manage all your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedClass('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedClass === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Classes
              </button>
              <button
                onClick={() => setSelectedClass('9-bio')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedClass === '9-bio' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Class 9 - Biology
              </button>
              <button
                onClick={() => setSelectedClass('10-chem')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedClass === '10-chem' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Class 10 - Chemistry
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map(student => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>Roll No: {student.rollNo}</CardDescription>
                </div>
                {getTrendIcon(student.trend)}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">Class {student.class}</Badge>
                <Badge variant="secondary">{student.subject}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{student.phone}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Attendance</p>
                  <p className={`text-lg font-bold ${
                    student.attendance >= 90 ? 'text-green-600' : 
                    student.attendance >= 75 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {student.attendance}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg Grade</p>
                  <p className={`text-lg font-bold ${
                    student.avgGrade >= 90 ? 'text-green-600' : 
                    student.avgGrade >= 75 ? 'text-blue-600' : 
                    'text-red-600'
                  }`}>
                    {student.avgGrade}%
                  </p>
                </div>
              </div>

              <button className="w-full mt-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                View Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No students found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
