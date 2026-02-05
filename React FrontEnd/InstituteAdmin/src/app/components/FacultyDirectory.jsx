import { useState } from 'react';
import { 
  Search, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Users, 
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle
} from 'lucide-react';

export default function FacultyDirectory({ selectedSession }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Mock faculty data
  const facultyData = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      email: 'sarah.mitchell@mit.edu',
      phone: '+1 (617) 555-0142',
      department: 'Computer Science',
      coursesTeaching: ['CS-301: Data Structures', 'CS-450: Advanced Algorithms'],
      totalStudents: 245,
      avgStudentSuccess: 84,
      successTrend: 5.2,
      contentUploaded: 34,
      lastActive: '2 hours ago',
      performance: 'Excellent'
    },
    {
      id: 2,
      name: 'Prof. James Chen',
      email: 'james.chen@mit.edu',
      phone: '+1 (617) 555-0198',
      department: 'Physics',
      coursesTeaching: ['PHY-201: Quantum Mechanics', 'PHY-301: Particle Physics'],
      totalStudents: 198,
      avgStudentSuccess: 76,
      successTrend: 2.8,
      contentUploaded: 28,
      lastActive: '5 hours ago',
      performance: 'Good'
    },
    {
      id: 3,
      name: 'Dr. Emily Roberts',
      email: 'emily.roberts@mit.edu',
      phone: '+1 (617) 555-0223',
      department: 'Chemistry',
      coursesTeaching: ['CHEM-150: Organic Chemistry', 'CHEM-250: Biochemistry'],
      totalStudents: 312,
      avgStudentSuccess: 88,
      successTrend: 7.1,
      contentUploaded: 42,
      lastActive: '1 hour ago',
      performance: 'Excellent'
    },
    {
      id: 4,
      name: 'Prof. Michael Brown',
      email: 'michael.brown@mit.edu',
      phone: '+1 (617) 555-0267',
      department: 'Mathematics',
      coursesTeaching: ['MATH-202: Advanced Calculus', 'MATH-305: Linear Algebra'],
      totalStudents: 289,
      avgStudentSuccess: 62,
      successTrend: -3.4,
      contentUploaded: 31,
      lastActive: '3 hours ago',
      performance: 'Needs Attention'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@mit.edu',
      phone: '+1 (617) 555-0311',
      department: 'English',
      coursesTeaching: ['ENG-101: Literature', 'ENG-202: Creative Writing'],
      totalStudents: 176,
      avgStudentSuccess: 91,
      successTrend: 4.5,
      contentUploaded: 39,
      lastActive: '30 minutes ago',
      performance: 'Excellent'
    },
    {
      id: 6,
      name: 'Prof. David Lee',
      email: 'david.lee@mit.edu',
      phone: '+1 (617) 555-0389',
      department: 'Computer Science',
      coursesTeaching: ['CS-401: Machine Learning', 'CS-501: AI Systems'],
      totalStudents: 267,
      avgStudentSuccess: 79,
      successTrend: 3.2,
      contentUploaded: 36,
      lastActive: '4 hours ago',
      performance: 'Good'
    },
    {
      id: 7,
      name: 'Dr. Rachel Green',
      email: 'rachel.green@mit.edu',
      phone: '+1 (617) 555-0445',
      department: 'Biology',
      coursesTeaching: ['BIO-250: Cell Biology', 'BIO-350: Genetics'],
      totalStudents: 234,
      avgStudentSuccess: 73,
      successTrend: -1.2,
      contentUploaded: 29,
      lastActive: '6 hours ago',
      performance: 'Good'
    },
    {
      id: 8,
      name: 'Prof. Thomas White',
      email: 'thomas.white@mit.edu',
      phone: '+1 (617) 555-0512',
      department: 'Statistics',
      coursesTeaching: ['STAT-301: Probability Theory', 'STAT-401: Data Analysis'],
      totalStudents: 203,
      avgStudentSuccess: 81,
      successTrend: 6.3,
      contentUploaded: 33,
      lastActive: '1 hour ago',
      performance: 'Excellent'
    }
  ];

  // Filter and sort faculty
  const filteredFaculty = facultyData
    .filter(faculty => 
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'success':
          return b.avgStudentSuccess - a.avgStudentSuccess;
        case 'students':
          return b.totalStudents - a.totalStudents;
        default:
          return 0;
      }
    });

  // Get performance badge styling
  const getPerformanceBadge = (performance) => {
    switch(performance) {
      case 'Excellent':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Needs Attention':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Summary stats
  const stats = {
    totalFaculty: facultyData.length,
    avgSuccess: Math.round(facultyData.reduce((sum, f) => sum + f.avgStudentSuccess, 0) / facultyData.length),
    totalStudents: facultyData.reduce((sum, f) => sum + f.totalStudents, 0),
    totalContent: facultyData.reduce((sum, f) => sum + f.contentUploaded, 0)
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Faculty Directory</h2>
        <p className="text-sm text-gray-600 mt-1">
          Performance summary for {selectedSession}
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Faculty</p>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalFaculty}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.avgSuccess}%</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Students</p>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Content Uploaded</p>
            <BookOpen className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalContent}</p>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, department, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="success">Success Rate</option>
              <option value="students">Student Count</option>
            </select>
          </div>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFaculty.map((faculty) => {
          const trendPositive = faculty.successTrend > 0;
          
          return (
            <div 
              key={faculty.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Faculty Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-white">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{faculty.name}</h3>
                    <p className="text-sm text-gray-600">{faculty.department}</p>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium mt-2 ${getPerformanceBadge(faculty.performance)}`}>
                      <Award className="w-3 h-3" />
                      {faculty.performance}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{faculty.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{faculty.phone}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-medium">Student Success Rate</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold text-gray-900">{faculty.avgStudentSuccess}%</span>
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        trendPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trendPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(faculty.successTrend)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Success rate indicator */}
                  <div className="relative h-16 w-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - faculty.avgStudentSuccess / 100)}`}
                        className={faculty.avgStudentSuccess >= 80 ? 'text-green-500' : faculty.avgStudentSuccess >= 70 ? 'text-blue-500' : 'text-red-500'}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-600">Students</p>
                    <p className="text-lg font-bold text-gray-900">{faculty.totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Content</p>
                    <p className="text-lg font-bold text-gray-900">{faculty.contentUploaded}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Courses</p>
                    <p className="text-lg font-bold text-gray-900">{faculty.coursesTeaching.length}</p>
                  </div>
                </div>
              </div>

              {/* Courses Teaching */}
              <div className="p-6">
                <h4 className="text-xs font-semibold text-gray-900 uppercase mb-3">Courses Teaching</h4>
                <div className="space-y-2">
                  {faculty.coursesTeaching.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    Last active: <span className="font-medium text-gray-900">{faculty.lastActive}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 py-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No faculty found matching your search</p>
        </div>
      )}

      {/* Results count */}
      {filteredFaculty.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Showing {filteredFaculty.length} of {facultyData.length} faculty members
        </div>
      )}
    </div>
  );
}