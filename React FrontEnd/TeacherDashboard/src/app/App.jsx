import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { GraduationCap, Users, Calendar, BookOpen, Settings, FileText, ClipboardCheck } from 'lucide-react';
import StudentList from './components/StudentList';
import AttendanceTracker from './components/AttendanceTracker';
import AIAgentsControl from './components/AIAgentsControl';
import AssignmentChecker from './components/AssignmentChecker';
import QuizChecker from './components/QuizChecker';
import ContentUploader from './components/ContentUploader';
import AppointmentManager from './components/AppointmentManager';
import DashboardOverview from './components/DashboardOverview';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock teacher data
  const teacherData = {
    name: 'Dr. Sarah Johnson',
    subjects: [
      { class: '9', subject: 'Biology', students: 32 },
      { class: '10', subject: 'Chemistry', students: 28 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-600">{teacherData.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {teacherData.subjects.length} Classes
                </p>
                <p className="text-xs text-gray-600">
                  {teacherData.subjects.reduce((acc, s) => acc + s.students, 0)} Students
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Quizzes</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="ai-agents" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">AI Agents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview teacherData={teacherData} />
          </TabsContent>

          <TabsContent value="students">
            <StudentList teacherData={teacherData} />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceTracker teacherData={teacherData} />
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentChecker />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizChecker />
          </TabsContent>

          <TabsContent value="content">
            <ContentUploader />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentManager />
          </TabsContent>

          <TabsContent value="ai-agents">
            <AIAgentsControl />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
