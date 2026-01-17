import { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
  Video
} from 'lucide-react';

export default function Counseling({ needsCounseling, grades }) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const instructors = [
    { id: '1', name: 'Dr. Sarah Chen', subject: 'Mathematics', available: true },
    { id: '2', name: 'Prof. James Wilson', subject: 'Physics', available: true },
    { id: '3', name: 'Dr. Emily Brown', subject: 'Chemistry', available: true },
    { id: '4', name: 'Prof. Michael Davis', subject: 'English', available: true },
    { id: '5', name: 'Dr. Lisa Anderson', subject: 'Computer Science', available: true }
  ];

  const counselors = [
    { id: '1', name: 'Ms. Jennifer Taylor', specialty: 'Academic Support', available: true },
    { id: '2', name: 'Mr. David Martinez', specialty: 'Career Counseling', available: true }
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM'
  ];

  const lowPerformanceSubjects = grades
    .filter(g => (g.score / g.total) * 100 < 50)
    .map(g => g.subject);

  const uniqueLowSubjects = [...new Set(lowPerformanceSubjects)];

  const handleBookAppointment = () => {
    if (selectedInstructor && selectedDate && selectedTime) {
      setIsBooked(true);
    }
  };

  const handleReset = () => {
    setSelectedInstructor(null);
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentType(null);
    setIsBooked(false);
  };

  if (!needsCounseling) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-green-900 mb-2">Great Job!</h2>
          <p className="text-green-700">
            Your average score is above 50%. No counseling required at this time.
          </p>
        </div>
      </div>
    );
  }

  if (isBooked) {
    const selectedPerson =
      appointmentType === 'instructor'
        ? instructors.find(i => i.id === selectedInstructor)
        : counselors.find(c => c.id === selectedInstructor);

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h2 className="text-gray-900 mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600">
              Your appointment has been successfully scheduled
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <p>{selectedPerson?.name}</p>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <p>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <p>{selectedTime}</p>
            </div>

            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-gray-600" />
              <p>Video Conference</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full mt-6 px-6 py-3 border rounded-lg"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex gap-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="text-red-900 mb-2">Counseling Required</h3>
            <p className="text-red-700">
              Your average score is below 50%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
