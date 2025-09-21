import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Activity,
  Star,
  TrendingUp,
  UserCheck,
  MessageSquare,
  Phone,
  Mail,
  Award,
  Heart,
  Eye,
  Plus
} from 'lucide-react';

const DoctorDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const stats = {
    todayAppointments: 12,
    totalPatients: 1247,
    rating: 4.9,
    completedToday: 8,
    upcomingToday: 4,
    monthlyRevenue: 125000,
    successRate: 98
  };

  const todayAppointments = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'Sarah Khan',
      type: 'Consultation',
      status: 'completed'
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'Ahmed Rahman',
      type: 'Follow-up',
      status: 'completed'
    },
    {
      id: 3,
      time: '02:00 PM',
      patient: 'Fatima Ali',
      type: 'Emergency',
      status: 'upcoming'
    },
    {
      id: 4,
      time: '03:30 PM',
      patient: 'Mohammad Hassan',
      type: 'Consultation',
      status: 'upcoming'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'Dr. Rahman',
      message: 'Patient consultation report ready for review',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      from: 'Nurse Sarah',
      message: 'Emergency patient admitted to room 205',
      time: '15 min ago',
      unread: true
    },
    {
      id: 3,
      from: 'Admin',
      message: 'Monthly performance report available',
      time: '1 hour ago',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Doctor Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Welcome back, Dr. Sadia Rahman</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300">
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300">
              <Eye className="w-4 h-4" />
              View Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200/30 hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Today's Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.todayAppointments}</p>
              <p className="text-green-600 text-sm mt-1">
                {stats.completedToday} completed, {stats.upcomingToday} upcoming
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-green-200/30 hover:shadow-2xl hover:shadow-green-200/30 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalPatients.toLocaleString()}</p>
              <p className="text-green-600 text-sm mt-1">+12 this week</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/90 to-yellow-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-yellow-200/30 hover:shadow-2xl hover:shadow-yellow-200/30 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rating</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.rating}</p>
              <p className="text-yellow-600 text-sm mt-1">245 reviews</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-200/30 hover:shadow-2xl hover:shadow-purple-200/30 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.successRate}%</p>
              <p className="text-purple-600 text-sm mt-1">This month</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Appointments */}
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-200 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.type} • {appointment.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-200/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Messages</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-300">
                <div className="p-2 bg-purple-200 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-purple-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{message.from}</p>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{message.message}</p>
                  {message.unread && (
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/30">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300">
            <UserCheck className="w-8 h-8" />
            <span className="text-sm font-medium">Check In Patient</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300">
            <Calendar className="w-8 h-8" />
            <span className="text-sm font-medium">Schedule</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200/50 hover:scale-105 transition-all duration-300">
            <MessageSquare className="w-8 h-8" />
            <span className="text-sm font-medium">Messages</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl hover:shadow-lg hover:shadow-yellow-200/50 hover:scale-105 transition-all duration-300">
            <Activity className="w-8 h-8" />
            <span className="text-sm font-medium">Reports</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-200/50 hover:scale-105 transition-all duration-300">
            <Phone className="w-8 h-8" />
            <span className="text-sm font-medium">Emergency</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200/50 hover:scale-105 transition-all duration-300">
            <Award className="w-8 h-8" />
            <span className="text-sm font-medium">Performance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;