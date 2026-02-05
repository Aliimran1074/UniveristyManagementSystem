import { useState } from 'react';
import { 
  Bell, 
  User, 
  AlertCircle, 
  Activity, 
  Menu, 
  X, 
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Bot,
  ChevronDown
} from 'lucide-react';
import AgentCommandCenter from './components/AgentCommandCenter';
import MasterContentLibrary from './components/MasterContentLibrary';
import StudentProgress from './components/StudentProgress';
import FacultyDirectory from './components/FacultyDirectory';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedSession, setSelectedSession] = useState('Session A 2025');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Available sessions
  const sessions = [
    'Session A 2025',
    'Batch B 2025',
    'Session A 2024',
    'Batch B 2024'
  ];

  // Mock data for students flagged for counseling
  const flaggedStudentsCount = 47;

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'master-content', label: 'Master Content', icon: BookOpen },
    { id: 'faculty', label: 'Faculty Directory', icon: Users },
    { id: 'students', label: 'Student Data (Session-Wise)', icon: GraduationCap },
    { id: 'agents', label: 'Agent Operations', icon: Bot }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">MIT LMS</h2>
                <p className="text-xs text-gray-600">Admin Portal</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Dr. Jennifer Adams</p>
              <p className="text-xs text-gray-600 truncate">System Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left side - Mobile menu + Session filter */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                  <Menu className="w-6 h-6" />
                </button>

                {/* Session Filter Dropdown */}
                <div className="relative">
                  <label className="block text-xs text-gray-600 mb-1">Academic Session</label>
                  <div className="relative">
                    <select
                      value={selectedSession}
                      onChange={(e) => setSelectedSession(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      {sessions.map((session) => (
                        <option key={session} value={session}>{session}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="hidden md:block flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-gray-900 truncate">
                    Massachusetts Institute of Technology
                  </h1>
                  <p className="text-xs text-gray-600 truncate">Multi-Agent Learning Management System</p>
                </div>
              </div>

              {/* Right side - Alert + Notifications */}
              <div className="flex items-center gap-3">
                {/* Counselling Alert Badge */}
                <div className="flex items-center gap-2 bg-red-50 border-2 border-red-500 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-red-900 uppercase hidden sm:block">Counseling Alert</p>
                    <p className="text-xs sm:text-sm font-bold text-red-600">{flaggedStudentsCount} Students &lt;50%</p>
                  </div>
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {activeView === 'dashboard' && (
              <AgentCommandCenter selectedSession={selectedSession} />
            )}
            {activeView === 'master-content' && (
              <MasterContentLibrary selectedSession={selectedSession} />
            )}
            {activeView === 'faculty' && (
              <FacultyDirectory selectedSession={selectedSession} />
            )}
            {activeView === 'students' && (
              <StudentProgress selectedSession={selectedSession} />
            )}
            {activeView === 'agents' && (
              <AgentCommandCenter selectedSession={selectedSession} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
