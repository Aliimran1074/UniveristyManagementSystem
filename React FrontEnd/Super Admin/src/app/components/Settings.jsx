import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Mail,
  CreditCard,
  Globe,
  Save,
} from 'lucide-react';

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoReportGeneration, setAutoReportGeneration] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Settings</h2>
        <p className="text-sm text-gray-500">Manage your super admin dashboard and platform preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        {/* Responsive Tabs List: Scrolls horizontally on mobile */}
        <div className="overflow-x-auto pb-1 scrollbar-hide">
          <TabsList className="w-full flex justify-start min-w-max md:min-w-0 md:grid md:grid-cols-5 bg-gray-100/80 p-1">
            <TabsTrigger value="general" className="px-4">General</TabsTrigger>
            <TabsTrigger value="notifications" className="px-4">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="px-4">Security</TabsTrigger>
            <TabsTrigger value="billing" className="px-4">Billing</TabsTrigger>
            <TabsTrigger value="advanced" className="px-4">Advanced</TabsTrigger>
          </TabsList>
        </div>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <SettingsIcon className="w-5 h-5 text-blue-600" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Platform Name</Label>
                  <Input defaultValue="Super Admin Dashboard" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Support Email</Label>
                  <Input defaultValue="support@dashboard.com" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Company Name</Label>
                  <Input defaultValue="Education Platform Inc." className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Contact Phone</Label>
                  <Input defaultValue="+1 234-567-8900" className="bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Company Address</Label>
                <Textarea defaultValue="123 Business Street, Suite 100, New York, NY 10001" className="bg-white" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="pr-4">
                  <p className="font-semibold text-gray-900 text-sm">Maintenance Mode</p>
                  <p className="text-xs text-gray-500">Temporarily disable platform access</p>
                </div>
                <Switch />
              </div>
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-blue-600" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <NotificationItem 
                title="Email Notifications" 
                desc="Critical alerts and daily summaries" 
                checked={emailNotifications} 
                onChange={setEmailNotifications} 
              />
              <NotificationItem 
                title="SMS Notifications" 
                desc="Direct mobile alerts for security" 
                checked={smsNotifications} 
                onChange={setSmsNotifications} 
              />
              <NotificationItem 
                title="Auto Report Generation" 
                desc="Monthly performance summaries" 
                checked={autoReportGeneration} 
                onChange={setAutoReportGeneration} 
              />
              <Button className="w-full md:w-auto bg-blue-600 mt-2">
                <Save className="w-4 h-4 mr-2" /> Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Content (Truncated for brevity, following the same responsive pattern) */}
        <TabsContent value="security">
          <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-blue-600" /> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="pr-4">
                  <p className="font-semibold text-blue-900 text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-blue-700">Highly recommended for admin accounts</p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Confirm Password</Label>
                  <Input type="password" />
                </div>
              </div>
              <Button className="w-full md:w-auto bg-blue-600">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
           <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="w-5 h-5 text-blue-600" /> Billing Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Currency</Label>
                  <Input defaultValue="USD" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Tax Rate (%)</Label>
                  <Input type="number" defaultValue="10" />
                </div>
              </div>
              <Button className="w-full md:w-auto bg-blue-600">Save Billing</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Content */}
        <TabsContent value="advanced">
          <Card className="border-none shadow-sm ring-1 ring-gray-200">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                <Database className="w-5 h-5" /> Advanced
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full justify-start"><Database className="w-4 h-4 mr-2"/> Database Backup</Button>
                  <Button variant="outline" className="w-full justify-start"><Globe className="w-4 h-4 mr-2"/> Clear Cache</Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 sm:col-span-2">Reset to Factory Settings</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Reusable Switch Item Component for Responsiveness
function NotificationItem({ title, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50/50 transition-colors">
      <div className="pr-4">
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}