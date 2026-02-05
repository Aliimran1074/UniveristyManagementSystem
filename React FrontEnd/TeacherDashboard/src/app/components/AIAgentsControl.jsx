import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Bot, FileText, ClipboardCheck, BookOpen, Sparkles, Activity } from 'lucide-react';

export default function AIAgentsControl() {
  const [agents, setAgents] = useState([
    {
      id: 'assignment-generator',
      name: 'Assignment Generator',
      description: 'Automatically generate customized assignments based on curriculum and difficulty level',
      icon: FileText,
      enabled: true,
      color: 'blue',
      stats: { generated: 45, avgTime: '2 min' }
    },
    {
      id: 'quiz-generator',
      name: 'Quiz Generator',
      description: 'Create quizzes with multiple question types from your course content',
      icon: ClipboardCheck,
      enabled: true,
      color: 'green',
      stats: { generated: 32, avgTime: '1.5 min' }
    },
    {
      id: 'assignment-checker',
      name: 'Assignment Checker',
      description: 'AI-powered grading and feedback for student assignments',
      icon: FileText,
      enabled: false,
      color: 'purple',
      stats: { checked: 128, avgTime: '30 sec' }
    },
    {
      id: 'quiz-checker',
      name: 'Quiz Checker',
      description: 'Automatic grading for objective-type quizzes with instant results',
      icon: ClipboardCheck,
      enabled: true,
      color: 'orange',
      stats: { checked: 256, avgTime: '10 sec' }
    },
    {
      id: 'content-creator',
      name: 'Course Content Creator',
      description: 'Generate comprehensive course materials, notes, and study guides',
      icon: BookOpen,
      enabled: false,
      color: 'indigo',
      stats: { created: 18, avgTime: '5 min' }
    }
  ]);

  const toggleAgent = (agentId) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, enabled: !agent.enabled } : agent
    ));
  };

  const getColorClasses = (color, enabled) => {
    const colors = {
      blue: {
        bg: enabled ? 'bg-blue-100' : 'bg-gray-100',
        text: enabled ? 'text-blue-600' : 'text-gray-400',
        border: enabled ? 'border-blue-200' : 'border-gray-200'
      },
      green: {
        bg: enabled ? 'bg-green-100' : 'bg-gray-100',
        text: enabled ? 'text-green-600' : 'text-gray-400',
        border: enabled ? 'border-green-200' : 'border-gray-200'
      },
      purple: {
        bg: enabled ? 'bg-purple-100' : 'bg-gray-100',
        text: enabled ? 'text-purple-600' : 'text-gray-400',
        border: enabled ? 'border-purple-200' : 'border-gray-200'
      },
      orange: {
        bg: enabled ? 'bg-orange-100' : 'bg-gray-100',
        text: enabled ? 'text-orange-600' : 'text-gray-400',
        border: enabled ? 'border-orange-200' : 'border-gray-200'
      },
      indigo: {
        bg: enabled ? 'bg-indigo-100' : 'bg-gray-100',
        text: enabled ? 'text-indigo-600' : 'text-gray-400',
        border: enabled ? 'border-indigo-200' : 'border-gray-200'
      }
    };
    return colors[color] || colors.blue;
  };

  const enabledCount = agents.filter(a => a.enabled).length;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                AI Agents Control Panel
              </CardTitle>
              <CardDescription className="mt-2">
                Manage your AI-powered teaching assistants to automate tasks and save time
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{enabledCount}/5</p>
              <p className="text-sm text-gray-600">Active Agents</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Activity className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-blue-600">487</p>
              <p className="text-sm text-blue-700">Total Tasks Completed</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <Bot className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-2xl font-bold text-green-600">12.5 hrs</p>
              <p className="text-sm text-green-700">Time Saved This Month</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Sparkles className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-2xl font-bold text-purple-600">96%</p>
              <p className="text-sm text-purple-700">Accuracy Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Agents Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map(agent => {
          const colors = getColorClasses(agent.color, agent.enabled);
          const Icon = agent.icon;
          
          return (
            <Card key={agent.id} className={`border-2 ${colors.border} transition-all ${agent.enabled ? 'shadow-md' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription className="mt-1">{agent.description}</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={agent.enabled}
                    onCheckedChange={() => toggleAgent(agent.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${agent.enabled ? 'bg-gray-50' : 'bg-gray-100 opacity-60'}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Tasks Completed</p>
                        <p className="text-lg font-bold text-gray-900">
                          {Object.values(agent.stats)[0]}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Avg Processing Time</p>
                        <p className="text-lg font-bold text-gray-900">
                          {Object.values(agent.stats)[1]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {agent.enabled && (
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                        Configure
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        View History
                      </button>
                    </div>
                  )}

                  {!agent.enabled && (
                    <div className="text-center py-2">
                      <p className="text-sm text-gray-500">Agent is currently disabled</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Settings and Tips */}
      <Card>
        <CardHeader>
          <CardTitle>AI Agent Settings & Tips</CardTitle>
          <CardDescription>Optimize your AI agents for better performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-blue-700">
                Enable the Assignment Checker and Quiz Checker together for a complete automated grading workflow. 
                You can always review and override AI decisions manually.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Accuracy Threshold</h4>
                <input 
                  type="range" 
                  min="70" 
                  max="100" 
                  defaultValue="90" 
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>70%</span>
                  <span>90%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Auto-review Required</h4>
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-gray-700">Review AI-graded assignments before publishing</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
