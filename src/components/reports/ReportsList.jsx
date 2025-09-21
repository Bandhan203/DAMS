import React, { useState } from 'react';
import {
  Download,
  ChevronDown,
  Calendar,
  Users,
  Banknote,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  UserX,
  Star,
  Award,
  TrendingUp,
  User,
  Search
} from 'lucide-react';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const tabs = ['Overview', 'Appointment', 'Revenue', 'Patient', 'Doctor', 'Inventory'];

  // Overview Statistics
  const overviewStats = [
    { label: 'Total Appointments', value: '4', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
    { label: 'Completed', value: '1', icon: CheckCircle, color: 'bg-cyan-50 text-cyan-600' },
    { label: 'Total Revenue', value: '৳24,200', icon: Banknote, color: 'bg-green-50 text-green-600' },
    { label: 'Active Patients', value: '4', icon: Users, color: 'bg-purple-50 text-purple-600' }
  ];

  // Appointment Status Data
  const appointmentStatus = [
    { label: 'Complete', value: 1, color: 'bg-cyan-500', percentage: 25 },
    { label: 'Scheduled', value: 2, color: 'bg-green-500', percentage: 50 },
    { label: 'Cancelled', value: 0, color: 'bg-red-500', percentage: 0 },
    { label: 'No Show', value: 0, color: 'bg-gray-500', percentage: 0 }
  ];

  // Revenue Breakdown Data
  const revenueBreakdown = [
    { label: 'Paid', value: '৳18,400', color: 'bg-green-500', percentage: 76 },
    { label: 'Pending', value: '৳4,400', color: 'bg-red-500', percentage: 18 }
  ];

  // Doctor Performance Data
  const doctorPerformance = [
    {
      id: 1,
      name: 'Dr. Rahman',
      specialty: 'Cardiologist',
      avatar: '👩‍⚕️',
      appointmentsCompleted: 28,
      rating: 4.9,
      revenue: 660000,
      patientsSeen: 166,
      efficiency: 94,
      responseTime: '14 min',
      status: 'active'
    },
    {
      id: 2,
      name: 'Dr. Mehedi Hasan',
      specialty: 'Pediatrician',
      avatar: '👨‍⚕️',
      appointmentsCompleted: 35,
      rating: 4.8,
      revenue: 540000,
      patientsSeen: 52,
      efficiency: 89,
      responseTime: '8 min',
      status: 'active'
    },
    {
      id: 3,
      name: 'Dr. Sadia Afrin',
      specialty: 'Dermatologist',
      avatar: '👩‍⚕️',
      appointmentsCompleted: 22,
      rating: 4.7,
      revenue: 392000,
      patientsSeen: 38,
      efficiency: 91,
      responseTime: '10 min',
      status: 'busy'
    },
    {
      id: 4,
      name: 'Dr. Sadia',
      specialty: 'Orthopedic',
      avatar: '👨‍⚕️',
      appointmentsCompleted: 18,
      rating: 4.6,
      revenue: 576000,
      patientsSeen: 31,
      efficiency: 87,
      responseTime: '12 min',
      status: 'active'
    }
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const time = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    return { date: 'August 14, 2025', time: '1:22 PM' };
  };

  // Export functionality
  const handleExportReports = async () => {
    setIsExporting(true);
    try {
      const reportData = [
        ['Report Type', 'Value', 'Date', 'Time Filter'],
        ['Total Appointments', '4', getCurrentDateTime().date, timeFilter],
        ['Completed Appointments', '1', getCurrentDateTime().date, timeFilter],
        ['Total Revenue', '৳24,200', getCurrentDateTime().date, timeFilter],
        ['Active Patients', '4', getCurrentDateTime().date, timeFilter],
        ['Top Doctor', 'Dr. Rahman', getCurrentDateTime().date, timeFilter],
        ['Average Rating', '4.8/5.0', getCurrentDateTime().date, timeFilter],
        ['Total Patients Seen', '166', getCurrentDateTime().date, timeFilter],
        ['Average Response Time', '14 min', getCurrentDateTime().date, timeFilter],
        ['', '', '', ''],
        ['Doctor Performance', '', '', ''],
        ['Doctor Name', 'Specialty', 'Appointments', 'Revenue'],
        ...doctorPerformance.map(doctor => [
          doctor.name,
          doctor.specialty,
          doctor.appointmentsCompleted,
          `৳${doctor.revenue.toLocaleString()}`
        ])
      ];

      const csvContent = reportData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `reports_${timeFilter.replace(' ', '_')}_${Date.now()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Reports exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Tab switching functionality
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log(`Switched to ${tab} tab`);
  };

  // Time filter functionality
  const timeFilterOptions = [
    'Today',
    'Yesterday', 
    'Last 7 Days',
    'This Month',
    'Last Month',
    'This Year',
    'Custom Range'
  ];

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setShowTimeDropdown(false);
    console.log(`Time filter changed to: ${filter}`);
  };

  // Search functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(`Search term: ${e.target.value}`);
  };

  // Date and time from getCurrentDateTime
  const { date, time } = getCurrentDateTime();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-lg p-6 border border-white/20 shadow-xl">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Report & Analytics
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive clinic performance insights</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 w-64"
              />
            </div>
            
            {/* Time Filter */}
            <div className="relative">
              <select 
                value={timeFilter}
                onChange={(e) => handleTimeFilterChange(e.target.value)}
                className="appearance-none bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
              >
                {timeFilterOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            
            {/* Export Button */}
            <button 
              onClick={handleExportReports}
              disabled={isExporting}
              className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Download className={`w-5 h-5 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-2">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:scale-105'
                  }`}
                >
                  {activeTab === tab && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 -z-10"></div>
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Section */}
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <div key={stat.label} 
                     className="group relative overflow-hidden"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur"></div>
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Appointment Status Distribution */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl blur"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
                    Appointment Status Distribution
                  </h3>
                  <div className="space-y-6">
                    {appointmentStatus.map((status, index) => (
                      <div key={status.label} 
                           className="flex items-center justify-between group/item"
                           style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full ${status.color} group-hover/item:scale-110 transition-transform duration-300`}></div>
                          <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300">
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-gray-900">{status.value}</span>
                          <div className="w-24 bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full ${status.color} transition-all duration-1000 ease-out`}
                              style={{ width: `${status.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl blur"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                    Revenue Breakdown
                  </h3>
                  <div className="space-y-6">
                    {revenueBreakdown.map((revenue, index) => (
                      <div key={revenue.label} 
                           className="flex items-center justify-between group/item"
                           style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full ${revenue.color} group-hover/item:scale-110 transition-transform duration-300`}></div>
                          <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300">
                            {revenue.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-gray-900">{revenue.value}</span>
                          <div className="w-24 bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full ${revenue.color} transition-all duration-1000 ease-out`}
                              style={{ width: `${revenue.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Performance */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-2xl blur"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                  Doctor Performance
                </h3>
                
                {/* Performance Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-blue-50/70 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100/70 rounded-xl">
                          <Award className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Top Performer</p>
                          <p className="text-lg font-bold text-blue-900">Dr. Rahman</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-green-50/70 backdrop-blur-sm rounded-xl p-6 border border-green-200/50 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100/70 rounded-xl">
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-green-600 font-medium">Avg Rating</p>
                          <p className="text-lg font-bold text-green-900">4.8/5.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-purple-50/70 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100/70 rounded-xl">
                          <Users className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-purple-600 font-medium">Total Patients</p>
                          <p className="text-lg font-bold text-purple-900">166</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-orange-50/70 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100/70 rounded-xl">
                          <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-orange-600 font-medium">Avg Response</p>
                          <p className="text-lg font-bold text-orange-900">14 min</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {doctorPerformance.map((doctor, index) => (
                    <div key={doctor.id} 
                         className="group relative"
                         style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl blur opacity-50"></div>
                      <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        {/* Doctor Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                              {doctor.avatar}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{doctor.name}</h4>
                              <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            </div>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-xs font-medium ${
                            doctor.status === 'active' 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : 'bg-orange-100 text-orange-700 border border-orange-200'
                          }`}>
                            {doctor.status === 'active' ? 'Active' : 'Busy'}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                            <p className="text-2xl font-bold text-gray-900">{doctor.appointmentsCompleted}</p>
                            <p className="text-xs text-gray-600 mt-1">Appointments</p>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                            <p className="text-2xl font-bold text-gray-900">{doctor.patientsSeen}</p>
                            <p className="text-xs text-gray-600 mt-1">Patients Seen</p>
                          </div>
                        </div>

                        {/* Rating and Revenue */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 text-lg">{doctor.rating}</span>
                              <span className="text-sm text-gray-600 ml-1">rating</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Banknote className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 text-lg">৳{doctor.revenue.toLocaleString()}</span>
                              <span className="text-sm text-gray-600 ml-1">revenue</span>
                            </div>
                          </div>
                        </div>

                        {/* Efficiency Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">Efficiency</span>
                            <span className="text-sm font-bold text-gray-900">{doctor.efficiency}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${doctor.efficiency}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Response Time */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Avg Response Time</span>
                          <span className="text-sm font-bold text-gray-900">{doctor.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tab Content Placeholders */}
        {activeTab !== 'Overview' && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-2xl blur"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-12 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-center text-gray-500">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur"></div>
                  <div className="relative p-6 bg-gray-100/50 rounded-full">
                    <Activity className="w-16 h-16 mx-auto text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-3 mt-6">
                  {activeTab} Analytics
                </h3>
                <p className="text-sm text-gray-600">
                  Detailed {activeTab.toLowerCase()} analytics will be displayed here
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative mt-12">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-gray-100 blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl border-t border-white/20 px-6 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              © 2025 MediCare Pro - Complete Clinic Management System
            </p>
            <p className="text-sm text-gray-600">
              {date} • {time}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReportsAnalytics;
