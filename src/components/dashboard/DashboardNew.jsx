import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  Banknote,
  TrendingUp,
  Clock,
  User,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({
    appointments: 0,
    patients: 0,
    doctors: 0,
    revenue: 0
  });

  // Navigation functions for dashboard buttons
  const handleNewAppointment = () => {
    navigate('/appointments');
  };

  const handleAddPatient = () => {
    navigate('/patients');
  };

  const handleDoctorSchedule = () => {
    navigate('/doctor/schedule');
  };

  const handleGenerateBill = () => {
    navigate('/billing');
  };

  // Navigate to specific management pages when stat cards are clicked
  const handleAppointmentClick = () => {
    navigate('/appointments');
  };

  const handlePatientClick = () => {
    navigate('/patients');
  };

  const handleDoctorClick = () => {
    navigate('/doctors');
  };

  const handleRevenueClick = () => {
    navigate('/billing');
  };

  // Handle calendar date clicks
  const handleCalendarDateClick = (day) => {
    if (appointmentDays.includes(parseInt(day))) {
      navigate('/appointments');
    }
  };

  // Handle chart interactions
  const handleRevenueChartClick = () => {
    navigate('/reports');
  };

  // Handle recent activity clicks
  const handleRecentActivityClick = (activityType) => {
    switch(activityType) {
      case 'appointment':
        navigate('/appointments');
        break;
      case 'payment':
        navigate('/billing');
        break;
      case 'reminder':
        navigate('/notifications');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Animate stats on component mount
  useEffect(() => {
    const targets = { appointments: 1, patients: 3, doctors: 3, revenue: 302.5 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        appointments: Math.round(targets.appointments * easeOut),
        patients: Math.round(targets.patients * easeOut),
        doctors: Math.round(targets.doctors * easeOut),
        revenue: (targets.revenue * easeOut).toFixed(1)
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);
  const chartData = [
    { month: '2021', revenue: 45 },
    { month: '2022', revenue: 85 },
    { month: '2023', revenue: 120 },
    { month: '2024', revenue: 160 },
    { month: '2025', revenue: 200 },
  ];

  const pieData = [
    { name: 'Consultation', value: 45, color: '#3B82F6' },
    { name: 'Follow-up', value: 30, color: '#10B981' },
    { name: 'Emergency', value: 15, color: '#EF4444' },
    { name: 'Routine', value: 10, color: '#F59E0B' },
  ];

  const septemberCalendar = [
    '', '', '', '', '', '', '1',
    '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29',
    '30', '', '', '', '', '', ''
  ];

  const appointmentDays = [1, 3, 4, 5, 6, 7, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  
  const appointmentTypes = {
    1: 'consultation', 3: 'follow-up', 4: 'emergency', 5: 'routine',
    6: 'consultation', 7: 'follow-up', 15: 'consultation', 16: 'emergency',
    17: 'routine', 18: 'consultation', 19: 'follow-up', 20: 'consultation',
    21: 'emergency', 22: 'routine', 23: 'consultation', 24: 'follow-up',
    25: 'consultation', 26: 'emergency', 27: 'routine', 28: 'consultation',
    29: 'follow-up', 30: 'consultation'
  };

  const getAppointmentTypeColor = (type) => {
    switch(type) {
      case 'consultation': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'follow-up': return 'bg-green-100 text-green-600 border-green-200';
      case 'emergency': return 'bg-red-100 text-red-600 border-red-200';
      case 'routine': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
              <h2 className="text-3xl font-bold text-white">Welcome to MediCare Pro</h2>
            </div>
            <p className="text-blue-100 mb-6 text-lg">Manage your clinic efficiently with our comprehensive dashboard</p>
            <div className="flex items-center space-x-6 text-sm text-blue-200 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Today - Sunday, Aug 18, 2025
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {animatedStats.appointments} appointments today
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {animatedStats.patients} total patients
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div 
          onClick={handleAppointmentClick}
          className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 group-hover:from-blue-500/20 group-hover:to-blue-600/10 transition-all duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Today's Appointments</p>
              <p className="text-4xl font-bold text-gray-800 mb-2">{animatedStats.appointments}</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <Calendar className="relative h-10 w-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>

        <div 
          onClick={handlePatientClick}
          className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 group-hover:from-green-500/20 group-hover:to-green-600/10 transition-all duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Patients</p>
              <p className="text-4xl font-bold text-gray-800 mb-2">{animatedStats.patients}</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last month
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <Users className="relative h-10 w-10 text-green-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>

        <div 
          onClick={handleDoctorClick}
          className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 group-hover:from-purple-500/20 group-hover:to-purple-600/10 transition-all duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Doctors</p>
              <p className="text-4xl font-bold text-gray-800 mb-2">{animatedStats.doctors}</p>
              <p className="text-xs text-blue-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                All active
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <Stethoscope className="relative h-10 w-10 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>

        <div 
          onClick={handleRevenueClick}
          className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 group-hover:from-orange-500/20 group-hover:to-orange-600/10 transition-all duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
              <p className="text-4xl font-bold text-gray-800 mb-2">৳{animatedStats.revenue}k</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% from last month
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <Banknote className="relative h-10 w-10 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
      </div>

      {/* Charts and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly Appointments Calendar */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">September 2025 - Appointments</h3>
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-xs font-medium text-gray-500">{day}</div>
            ))}
            
            {/* Calendar days */}
            {septemberCalendar.map((day, index) => {
              const dayNum = parseInt(day);
              const hasAppointment = appointmentDays.includes(dayNum);
              const appointmentType = appointmentTypes[dayNum];
              
              return (
                <div key={index} className="relative">
                  {day && (
                    <div 
                      onClick={() => handleCalendarDateClick(day)}
                      className={`p-2 text-sm rounded-lg ${
                        hasAppointment 
                          ? `border-2 ${getAppointmentTypeColor(appointmentType)} hover:scale-105` 
                          : 'text-gray-700 hover:bg-gray-100'
                      } cursor-pointer transition-all duration-200`}
                    >
                      {day}
                      {hasAppointment && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
              <span>Consultation</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
              <span>Follow-up</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
              <span>Emergency</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span>Routine</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div 
          onClick={handleRevenueChartClick}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Monthly Revenue Trend</h3>
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="group flex items-center justify-between p-3 rounded-lg hover:bg-blue-50/50 transition-all duration-300">
                <span className="text-sm font-medium text-gray-700">{item.month}</span>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-400 group-hover:to-blue-500" 
                      style={{ width: `${(item.revenue / 200) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 min-w-[60px]">৳{item.revenue}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment Types Distribution & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Types */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Appointment Types Distribution</h3>
            <Activity className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${item.value}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleNewAppointment}
              className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl text-center hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-blue-200/50"
            >
              <Calendar className="h-7 w-7 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm text-blue-700 font-semibold">New Appointment</span>
            </button>
            <button 
              onClick={handleAddPatient}
              className="group p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl text-center hover:from-green-100 hover:to-green-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-green-200/50"
            >
              <User className="h-7 w-7 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm text-green-700 font-semibold">Add Patient</span>
            </button>
            <button 
              onClick={handleDoctorSchedule}
              className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl text-center hover:from-purple-100 hover:to-purple-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-purple-200/50"
            >
              <Stethoscope className="h-7 w-7 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm text-purple-700 font-semibold">Doctor Schedule</span>
            </button>
            <button 
              onClick={handleGenerateBill}
              className="group p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl text-center hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-orange-200/50"
            >
              <Banknote className="h-7 w-7 text-orange-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm text-orange-700 font-semibold">Generate Bill</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
          <Activity className="h-6 w-6 text-blue-600" />
        </div>
        <div className="space-y-4">
          <div 
            onClick={() => handleRecentActivityClick('appointment')}
            className="group flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-gray-800">New appointment scheduled</p>
              <p className="text-xs text-gray-600">Dr. Ahmed - Patient: Sarah Khan - 2:30 PM</p>
            </div>
            <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">5 min ago</span>
          </div>
          
          <div 
            onClick={() => handleRecentActivityClick('payment')}
            className="group flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200/50 hover:from-green-100 hover:to-green-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-gray-800">Payment received</p>
              <p className="text-xs text-gray-600">৳2,500 from Patient: Lamia Khan</p>
            </div>
            <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">15 min ago</span>
          </div>
          
          <div 
            onClick={() => handleRecentActivityClick('reminder')}
            className="group flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-xl border border-yellow-200/50 hover:from-yellow-100 hover:to-yellow-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-yellow-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-gray-800">Appointment reminder</p>
              <p className="text-xs text-gray-600">Upcoming: Dr. Rahman - Patient: Panna Akter - 3:00 PM</p>
            </div>
            <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">30 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;