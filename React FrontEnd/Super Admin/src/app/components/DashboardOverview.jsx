import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, Users, DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DashboardOverview() {
  const stats = [
    {
      title: 'Total Institutes',
      value: '248',
      change: '+12%',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Subscriptions',
      value: '189',
      change: '+8%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Monthly Revenue',
      value: '$45,231',
      change: '+23%',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Users',
      value: '12,456',
      change: '+18%',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 32000, subscriptions: 145 },
    { month: 'Feb', revenue: 35000, subscriptions: 152 },
    { month: 'Mar', revenue: 38000, subscriptions: 160 },
    { month: 'Apr', revenue: 41000, subscriptions: 175 },
    { month: 'May', revenue: 43000, subscriptions: 182 },
    { month: 'Jun', revenue: 45231, subscriptions: 189 },
  ];

  const subscriptionTypeData = [
    { name: 'Complete Institute', value: 85, color: '#3b82f6' },
    { name: 'Batch', value: 67, color: '#10b981' },
    { name: 'Class', value: 37, color: '#f59e0b' },
  ];

  const recentActivity = [
    {
      institute: 'Cambridge Institute',
      action: 'Upgraded to Complete Institute',
      time: '2 hours ago',
      status: 'success',
    },
    {
      institute: 'Tech Academy',
      action: 'Subscription Expiring Soon',
      time: '4 hours ago',
      status: 'warning',
    },
    {
      institute: 'Global University',
      action: 'New Batch Subscription',
      time: '6 hours ago',
      status: 'success',
    },
    {
      institute: 'Smart Learning',
      action: 'Payment Overdue',
      time: '1 day ago',
      status: 'error',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Subscriptions Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Subscriptions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.status === 'success'
                      ? 'bg-green-500'
                      : activity.status === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.institute}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
