import { useState } from 'react';
import { BookOpen, ClipboardList, Award, MessageCircle, Home } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ContentView from './components/ContentView';
import QuizAssignment from './components/QuizAssignment';
import Grading from './components/Grading';
import Counseling from './components/Counseling';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock student data
  const [studentData, setStudentData] = useState({
    name: 'Alex Johnson',
    studentId: 'ST2024-1523',
    grades: [
      { subject: 'Mathematics', score: 45, total: 100, type: 'Quiz' },
      { subject: 'Physics', score: 78, total: 100, type: 'Assignment' },
      { subject: 'Chemistry', score: 38, total: 100, type: 'Quiz' },
      { subject: 'English', score: 85, total: 100, type: 'Assignment' },
      { subject: 'Computer Science', score: 42, total: 100, type: 'Quiz' },
    ],
  });

  // Calculate average percentage
  const calculateAverage = () => {
    const total = studentData.grades.reduce(
      (sum, grade) => sum + (grade.score / grade.total) * 100, 
      0
    );
    return total / studentData.grades.length;
  };

  const averagePercentage = calculateAverage();
  const needsCounseling = averagePercentage < 50;

  const handleQuizSubmit = (subject, score, total) => {
    setStudentData({
      ...studentData,
      grades: [...studentData.grades, { subject, score, total, type: 'Quiz' }],
    });
    setActiveTab('grading');
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'content', label: 'Content', icon: BookOpen },
    { id: 'quiz', label: 'Quiz & Assignments', icon: ClipboardList },
    { id: 'grading', label: 'Grading', icon: Award },
    { id: 'counseling', label: 'Counseling', icon: MessageCircle, alert: needsCounseling },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Student Portal</h1>
              <p className="text-gray-600">{studentData.name} - {studentData.studentId}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-gray-600">Average Score</p>
                <p className={`${averagePercentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                  {averagePercentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors relative ${
                    activeTab === item.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.alert && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            studentData={studentData}
            averagePercentage={averagePercentage}
            needsCounseling={needsCounseling}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'content' && <ContentView />}
        {activeTab === 'quiz' && <QuizAssignment onSubmit={handleQuizSubmit} />}
        {activeTab === 'grading' && <Grading grades={studentData.grades} />}
        {activeTab === 'counseling' && (
          <Counseling needsCounseling={needsCounseling} grades={studentData.grades} />
        )}
      </main>
    </div>
  );
}
