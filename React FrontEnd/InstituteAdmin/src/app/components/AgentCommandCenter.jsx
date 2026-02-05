import { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  BookCheck, 
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function AgentCommandCenter({ selectedSession }) {
  // Mock agent data
  const agents = [
    {
      id: 1,
      name: 'Content Creator Agent',
      icon: FileText,
      status: 'Active',
      statusColor: 'bg-green-500',
      efficiency: 92,
      trend: 5.2,
      totalTasks: 156,
      completed: 143,
      processing: 11,
      failed: 2,
      description: 'Converting teacher uploads into learning modules',
      recentActivity: [
        { action: 'Processed lecture notes', teacher: 'Dr. Sarah Mitchell', time: '2 min ago' },
        { action: 'Created quiz module', teacher: 'Prof. James Chen', time: '15 min ago' },
        { action: 'Generated study guide', teacher: 'Dr. Emily Roberts', time: '32 min ago' }
      ]
    },
    {
      id: 2,
      name: 'Quiz & Assignment Agent',
      icon: BookCheck,
      status: 'Active',
      statusColor: 'bg-green-500',
      efficiency: 88,
      trend: 3.8,
      totalTasks: 342,
      completed: 298,
      processing: 38,
      failed: 6,
      description: 'Automated grading and difficulty analysis',
      recentActivity: [
        { action: 'Graded 45 submissions', teacher: 'Prof. Michael Brown', time: '5 min ago' },
        { action: 'Difficulty analysis complete', teacher: 'Dr. Lisa Anderson', time: '18 min ago' },
        { action: 'Generated performance report', teacher: 'Prof. David Lee', time: '41 min ago' }
      ]
    },
    {
      id: 3,
      name: 'Counseling Agent',
      icon: MessageSquare,
      status: 'Active',
      statusColor: 'bg-yellow-500',
      efficiency: 74,
      trend: -2.1,
      totalTasks: 89,
      completed: 52,
      processing: 31,
      failed: 6,
      description: 'Student interventions and remedial content delivery',
      recentActivity: [
        { action: 'Flagged 8 students for intervention', teacher: 'System', time: '1 min ago' },
        { action: 'Sent remedial content to 12 students', teacher: 'System', time: '22 min ago' },
        { action: 'Scheduled 5 counseling meetings', teacher: 'System', time: '1 hour ago' }
      ]
    }
  ];

  // Counseling intervention tracking
  const interventionStats = {
    studentsFlagged: 47,
    remediaSent: 38,
    meetingsScheduled: 24,
    interventionsCompleted: 15
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Agent Command Center</h2>
        <p className="text-sm text-gray-600 mt-1">
          Real-time monitoring for {selectedSession}
        </p>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const trendPositive = agent.trend > 0;
          
          return (
            <div 
              key={agent.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`h-2 w-2 rounded-full ${agent.statusColor} animate-pulse`} />
                        <span className="text-xs text-gray-600">{agent.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600">{agent.description}</p>
              </div>

              {/* Efficiency Metrics */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-medium">Efficiency</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-bold text-gray-900">{agent.efficiency}%</span>
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        trendPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trendPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(agent.trend)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini sparkline visualization */}
                  <div className="flex items-end gap-1 h-12">
                    {[65, 72, 68, 75, 80, 78, 85, agent.efficiency].map((val, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2 rounded-t ${trendPositive ? 'bg-green-200' : 'bg-red-200'}`}
                        style={{ height: `${(val / 100) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${agent.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Task Statistics */}
              <div className="p-6 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-green-600 mb-1">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Done</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{agent.completed}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium">Active</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{agent.processing}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-red-600 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-medium">Failed</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{agent.failed}</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-6">
                <h4 className="text-xs font-semibold text-gray-900 uppercase mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {agent.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-900 font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.teacher} · {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Counseling Intervention Tracker */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Counseling Intervention Pipeline</h3>
              <p className="text-xs text-gray-600">Students scoring below 50% academic threshold</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Students Flagged</p>
                <div className="h-8 w-8 bg-red-50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{interventionStats.studentsFlagged}</p>
              <p className="text-xs text-gray-600 mt-1">Requires attention</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Remedial Content</p>
                <div className="h-8 w-8 bg-yellow-50 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{interventionStats.remediaSent}</p>
              <p className="text-xs text-gray-600 mt-1">Materials sent</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Meetings Scheduled</p>
                <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{interventionStats.meetingsScheduled}</p>
              <p className="text-xs text-gray-600 mt-1">With counselors</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Completed</p>
                <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{interventionStats.interventionsCompleted}</p>
              <p className="text-xs text-gray-600 mt-1">Interventions done</p>
            </div>
          </div>

          {/* Pipeline visualization */}
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-red-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">→</span>
              <div className="flex-1 h-2 bg-yellow-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${(interventionStats.remediaSent / interventionStats.studentsFlagged) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">→</span>
              <div className="flex-1 h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(interventionStats.meetingsScheduled / interventionStats.studentsFlagged) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">→</span>
              <div className="flex-1 h-2 bg-green-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(interventionStats.interventionsCompleted / interventionStats.studentsFlagged) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}