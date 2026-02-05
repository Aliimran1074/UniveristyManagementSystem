import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  RefreshCw,
  Edit,
  Pause,
  Play
} from 'lucide-react';
import { Progress } from './ui/progress';

export function SubscriptionManagement() {
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const subscriptions = [
    {
      id: 1,
      instituteName: 'Cambridge Institute',
      plan: 'Complete Institute',
      price: '$2,499/month',
      startDate: '2024-01-15',
      endDate: '2027-01-15',
      daysRemaining: 365,
      status: 'Active',
      paymentStatus: 'Paid',
      userLimit: 500,
      currentUsers: 342,
      features: ['Unlimited Batches', 'Advanced Analytics', 'Priority Support'],
      autoRenew: true,
    },
    {
      id: 2,
      instituteName: 'Tech Academy',
      plan: 'Batch',
      price: '$899/month',
      startDate: '2025-06-01',
      endDate: '2026-03-15',
      daysRemaining: 40,
      status: 'Expiring Soon',
      paymentStatus: 'Paid',
      userLimit: 150,
      currentUsers: 145,
      features: ['5 Batches', 'Basic Analytics', 'Email Support'],
      autoRenew: false,
    },
    {
      id: 3,
      instituteName: 'Global University',
      plan: 'Complete Institute',
      price: '$4,999/month',
      startDate: '2024-03-20',
      endDate: '2027-03-20',
      daysRemaining: 410,
      status: 'Active',
      paymentStatus: 'Paid',
      userLimit: 1000,
      currentUsers: 678,
      features: ['Unlimited Batches', 'Advanced Analytics', 'Priority Support', 'Custom Integration'],
      autoRenew: true,
    },
    {
      id: 4,
      instituteName: 'Smart Learning Center',
      plan: 'Class',
      price: '$299/month',
      startDate: '2025-11-10',
      endDate: '2026-11-10',
      daysRemaining: 280,
      status: 'Active',
      paymentStatus: 'Overdue',
      userLimit: 50,
      currentUsers: 48,
      features: ['1 Class', 'Basic Features', 'Community Support'],
      autoRenew: true,
    },
    {
      id: 5,
      instituteName: 'Future Minds Institute',
      plan: 'Batch',
      price: '$1,299/month',
      startDate: '2024-08-05',
      endDate: '2025-01-25',
      daysRemaining: 0,
      status: 'Expired',
      paymentStatus: 'Unpaid',
      userLimit: 200,
      currentUsers: 0,
      features: ['10 Batches', 'Advanced Analytics', 'Email Support'],
      autoRenew: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-700';
      case 'Expired':
        return 'bg-red-100 text-red-700';
      case 'Paused':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Overdue':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Unpaid':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const planPricing = {
    'Complete Institute': [
      { users: '0-500', price: '$2,499' },
      { users: '501-1000', price: '$4,999' },
      { users: '1001+', price: 'Custom' },
    ],
    'Batch': [
      { batches: '1-5', price: '$899' },
      { batches: '6-10', price: '$1,299' },
      { batches: '11+', price: '$1,799' },
    ],
    'Class': [
      { classes: '1', price: '$299' },
      { classes: '2-3', price: '$499' },
      { classes: '4+', price: '$699' },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Subscription Management</h2>
          <p className="text-gray-600 mt-1">Manage all active and expired subscriptions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-gray-900">189</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-semibold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">MRR</p>
                <p className="text-2xl font-semibold text-gray-900">$45.2K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institute</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.instituteName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{subscription.plan}</Badge>
                    </TableCell>
                    <TableCell>{subscription.price}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-gray-900">{subscription.startDate}</p>
                        <p className="text-gray-500">to {subscription.endDate}</p>
                        {subscription.daysRemaining > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {subscription.daysRemaining} days left
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(subscription.paymentStatus)}>
                        {subscription.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-gray-900 mb-1">
                          {subscription.currentUsers}/{subscription.userLimit}
                        </p>
                        <Progress 
                          value={(subscription.currentUsers / subscription.userLimit) * 100} 
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSubscription(subscription)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Manage Subscription - {subscription.instituteName}</DialogTitle>
                          </DialogHeader>
                          {selectedSubscription && (
                            <div className="space-y-6 py-4">
                              {/* Subscription Details */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Current Plan</Label>
                                  <p className="text-lg font-medium mt-1">{selectedSubscription.plan}</p>
                                </div>
                                <div>
                                  <Label>Price</Label>
                                  <p className="text-lg font-medium mt-1">{selectedSubscription.price}</p>
                                </div>
                                <div>
                                  <Label>Start Date</Label>
                                  <p className="text-sm mt-1">{selectedSubscription.startDate}</p>
                                </div>
                                <div>
                                  <Label>End Date</Label>
                                  <p className="text-sm mt-1">{selectedSubscription.endDate}</p>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge className={`${getStatusColor(selectedSubscription.status)} mt-1`}>
                                    {selectedSubscription.status}
                                  </Badge>
                                </div>
                                <div>
                                  <Label>Auto Renew</Label>
                                  <p className="text-sm mt-1">
                                    {selectedSubscription.autoRenew ? 'Enabled' : 'Disabled'}
                                  </p>
                                </div>
                              </div>

                              {/* Features */}
                              <div>
                                <Label>Plan Features</Label>
                                <ul className="mt-2 space-y-1">
                                  {selectedSubscription.features.map((feature, idx) => (
                                    <li key={idx} className="text-sm flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Usage */}
                              <div>
                                <Label>Usage Limits</Label>
                                <div className="mt-2 bg-gray-50 rounded-lg p-4">
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm">Users</span>
                                    <span className="text-sm font-medium">
                                      {selectedSubscription.currentUsers}/{selectedSubscription.userLimit}
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(selectedSubscription.currentUsers / selectedSubscription.userLimit) * 100} 
                                  />
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button className="flex-1" variant="outline">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Plan
                                </Button>
                                <Button className="flex-1" variant="outline">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Extend Period
                                </Button>
                                {selectedSubscription.status === 'Active' ? (
                                  <Button className="flex-1" variant="outline">
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pause
                                  </Button>
                                ) : (
                                  <Button className="flex-1" variant="outline">
                                    <Play className="w-4 h-4 mr-2" />
                                    Activate
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans & Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(planPricing).map(([planName, tiers]) => (
              <div key={planName} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">{planName}</h3>
                <div className="space-y-3">
                  {tiers.map((tier, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {tier.users || tier.batches || tier.classes}
                      </span>
                      <span className="font-medium text-gray-900">{tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
