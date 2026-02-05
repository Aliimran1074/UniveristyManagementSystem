import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, Check, X, User, MessageSquare, Search, MoreVertical, CheckCircle2 } from 'lucide-react';

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState([
    { id: 1, studentName: 'John Smith', class: '9', subject: 'Biology', requestDate: '2026-02-04', preferredDate: '2026-02-06', preferredTime: '2:00 PM - 3:00 PM', reason: 'Need help with Cell Biology chapter.', status: 'pending' },
    { id: 4, studentName: 'Sarah Davis', class: '9', subject: 'Biology', confirmedDate: '2026-02-05', confirmedTime: '2:00 PM - 3:00 PM', reason: 'Discussion about research project.', status: 'confirmed' },
    { id: 7, studentName: 'Emily Martinez', class: '9', subject: 'Biology', confirmedDate: '2026-02-02', confirmedTime: '2:00 PM - 3:00 PM', status: 'completed' }
  ]);

  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Memoized filtering for performance
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => 
      appt.status === selectedTab &&
      appt.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [appointments, selectedTab, searchQuery]);

  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => prev.map(appt => 
      appt.id === id ? { ...appt, status: newStatus } : appt
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Appointments</h1>
          <p className="text-gray-500">Manage your student sessions and requests</p>
        </div>

        {/* Search and Tabs Container */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by student name..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Horizontal Scrollable Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-gray-100">
            {['pending', 'confirmed', 'completed', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap ${
                  selectedTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab} ({appointments.filter(a => a.status === tab).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt) => (
            <AppointmentCard 
              key={appt.id} 
              appt={appt} 
              onAction={handleStatusChange} 
            />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No {selectedTab} appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentCard({ appt, onAction }) {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-3xl">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Status Indicator Strip */}
          <div className={`w-full sm:w-2 h-2 sm:h-auto ${
            appt.status === 'pending' ? 'bg-orange-400' : 
            appt.status === 'confirmed' ? 'bg-green-500' : 'bg-gray-300'
          }`} />

          <div className="p-5 flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                  {appt.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{appt.studentName}</h3>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider px-2 py-0">
                      Class {appt.class}
                    </Badge>
                    <Badge className="bg-blue-50 text-blue-700 border-none text-[10px] font-bold uppercase tracking-wider px-2 py-0">
                      {appt.subject}
                    </Badge>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* DateTime Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-2xl">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Calendar className="w-4 h-4 text-blue-500" />
                {appt.confirmedDate || appt.preferredDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Clock className="w-4 h-4 text-blue-500" />
                {appt.confirmedTime || appt.preferredTime}
              </div>
            </div>

            {appt.reason && (
              <p className="text-sm text-gray-500 italic px-1 line-clamp-2">
                "{appt.reason}"
              </p>
            )}

            {/* Responsive Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {appt.status === 'pending' && (
                <>
                  <button 
                    onClick={() => onAction(appt.id, 'confirmed')}
                    className="flex-1 min-w-[120px] bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button 
                    onClick={() => onAction(appt.id, 'rejected')}
                    className="flex-1 min-w-[120px] bg-gray-100 text-gray-600 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <X className="w-4 h-4" /> Decline
                  </button>
                </>
              )}
              
              {appt.status === 'confirmed' && (
                <button 
                  onClick={() => onAction(appt.id, 'completed')}
                  className="w-full bg-green-50 text-green-700 border border-green-200 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-100 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark as Completed
                </button>
              )}

              {appt.status === 'completed' && (
                <button className="w-full bg-gray-50 text-gray-500 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-default">
                  Meeting Finished
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}