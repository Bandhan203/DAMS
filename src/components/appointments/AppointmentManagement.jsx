import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  Phone,
  Calendar,
  Clock,
  User,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  CalendarPlus,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  Activity,
  MapPin
} from 'lucide-react';

const appointmentsData = [
  {
    id: 1,
    patientName: 'Sarah Khan',
    doctorName: 'Dr. Sadia Afrin',
    date: '2024-03-15',
    time: '09:30 AM',
    phone: '0134 567 8900',
    status: 'Confirmed',
    type: 'Consultation',
    symptoms: 'Chest pain, shortness of breath, fatigue',
    notes: 'Follow-up consultation for cardiac evaluation'
  },
  {
    id: 2,
    patientName: 'Panna Akter',
    doctorName: 'Dr. Mehed hasan',
    date: '2024-03-15',
    time: '10:00 AM',
    phone: '0194 567 8901',
    status: 'Scheduled',
    type: 'Consultation',
    symptoms: 'Recurring headaches, dizziness',
    notes: 'Initial consultation for neurological assessment'
  },
  {
    id: 3,
    patientName: 'Robel',
    doctorName: 'Dr. Mehedi Hasan',
    date: '2024-03-15',
    time: '11:30 AM',
    phone: '01884 567 8902',
    status: 'Confirmed',
    type: 'Consultation',
    symptoms: 'Skin rash, itching, allergic reaction',
    notes: 'Dermatology consultation for allergy testing'
  },
  {
    id: 4,
    patientName: 'Dulal',
    doctorName: 'Dr. Rahman',
    date: '2024-03-16',
    time: '02:00 PM',
    phone: '0144 567 8903',
    status: 'Scheduled',
    type: 'Consultation',
    symptoms: 'Joint pain, stiffness in morning',
    notes: 'Rheumatology follow-up for arthritis management'
  },
  {
    id: 5,
    patientName: 'Jessica ',
    doctorName: 'Dr. Sadia',
    date: '2024-03-16',
    time: '03:30 PM',
    phone: '0134 567 8904',
    status: 'Confirmed',
    type: 'Consultation',
    symptoms: 'Persistent cough, chest congestion',
    notes: 'Pulmonary consultation for respiratory issues'
  }
];

const AppointmentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Filter appointments based on search term and status
  const filteredAppointments = appointmentsData.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All Statuses' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses for filter
  const statuses = [...new Set(appointmentsData.map(appointment => appointment.status))];

  // Handler functions for all buttons
  const handleNewAppointment = () => {
    navigate('/appointments/new');
  };

  const handleExportData = () => {
    // Export appointment data to CSV
    const csvContent = appointmentsData.map(appointment => 
      `${appointment.patientName},${appointment.doctorName},${appointment.date},${appointment.time},${appointment.phone},${appointment.status},${appointment.type},"${appointment.symptoms}","${appointment.notes}"`
    ).join('\n');
    
    const header = 'Patient Name,Doctor Name,Date,Time,Phone,Status,Type,Symptoms,Notes\n';
    const blob = new Blob([header + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointments_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleViewDetails = (appointmentId) => {
    navigate(`/appointments/details/${appointmentId}`);
  };

  const handleEditAppointment = (appointmentId) => {
    navigate(`/appointments/edit/${appointmentId}`);
  };

  const handleSendMessage = (appointmentId) => {
    navigate(`/communications/message?appointmentId=${appointmentId}`);
  };

  const handleDeleteAppointment = (appointmentId) => {
    setShowDeleteConfirm(appointmentId);
  };

  const confirmDeleteAppointment = (appointmentId) => {
    // Here you would typically make an API call to delete the appointment
    console.log(`Deleting appointment with ID: ${appointmentId}`);
    setShowDeleteConfirm(null);
    // You could also update the appointments list or refresh the data
  };

  const handleCallPatient = (phone, patientName) => {
    // This could open a calling interface or integrate with a calling system
    if (navigator.userAgent.includes('Mobile')) {
      // On mobile, open the phone dialer
      window.location.href = `tel:${phone}`;
    } else {
      // On desktop, show a notification or integrate with calling software
      alert(`Calling ${patientName} at ${phone}\n\nOn a mobile device, this would open the phone dialer.`);
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setShowFilters(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Scheduled':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'from-green-500 to-green-600 text-white';
      case 'Scheduled':
        return 'from-yellow-500 to-yellow-600 text-white';
      case 'Cancelled':
        return 'from-red-500 to-red-600 text-white';
      case 'Completed':
        return 'from-blue-500 to-blue-600 text-white';
      default:
        return 'from-gray-500 to-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Appointment Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage and track all patient appointments efficiently</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleNewAppointment}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
            >
              <CalendarPlus className="w-4 h-4" />
              New Appointment
            </button>
            <button 
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments by patient, doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
              />
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button 
                onClick={handleToggleFilters}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-lg hover:shadow-gray-200/50 hover:scale-105 transition-all duration-300 border border-gray-200/50"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-10 p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Filter by Status</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStatusFilter('All Statuses')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        statusFilter === 'All Statuses' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      All Statuses
                    </button>
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusFilter(status)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                          statusFilter === status ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {getStatusIcon(status)}
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Count */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-xl font-semibold">
            <Activity className="w-4 h-4" />
            <span>{filteredAppointments.length} {filteredAppointments.length === 1 ? 'Appointment' : 'Appointments'} {searchTerm || statusFilter !== 'All Statuses' ? 'Found' : 'Total'}</span>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              {/* Left Side - Main Info */}
              <div className="flex-1">
                {/* Patient & Doctor Info Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{appointment.patientName}</h3>
                      <p className="text-blue-600 font-semibold">{appointment.doctorName}</p>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getStatusColor(appointment.status)} rounded-xl shadow-lg font-semibold`}>
                      {getStatusIcon(appointment.status)}
                      <span>{appointment.status}</span>
                    </div>
                    <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-lg font-medium">
                      {appointment.type}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {/* Date */}
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200/50">
                    <div className="p-2 bg-green-200 rounded-lg">
                      <Calendar className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Date</p>
                      <p className="font-semibold text-green-800">
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
                    <div className="p-2 bg-blue-200 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Time</p>
                      <p className="font-semibold text-blue-800">{appointment.time}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200/50">
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <Phone className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Contact</p>
                      <p className="font-semibold text-purple-800">{appointment.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Symptoms & Notes */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200/50">
                    <span className="text-sm font-semibold text-yellow-700 mb-2 block">Symptoms:</span>
                    <span className="text-sm text-yellow-800">{appointment.symptoms}</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                    <span className="text-sm font-semibold text-purple-700 mb-2 block">Notes:</span>
                    <span className="text-sm text-purple-800">{appointment.notes}</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="flex flex-col gap-3 ml-6">
                <div className="flex flex-col gap-2 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(appointment.id);
                    }}
                    className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAppointment(appointment.id);
                    }}
                    className="p-3 bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                    title="Edit Appointment"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendMessage(appointment.id);
                    }}
                    className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                    title="Send Message"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAppointment(appointment.id);
                    }}
                    className="p-3 bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                    title="Delete Appointment"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Quick Action - Phone Call */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCallPatient(appointment.phone, appointment.patientName);
                  }}
                  className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                  title="Call Patient"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {filteredAppointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <Calendar className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointments Found</h3>
            <p className="text-gray-500 text-center mb-4">
              {searchTerm || statusFilter !== 'All Statuses'
                ? 'Try adjusting your search criteria or filters'
                : 'No appointments are currently scheduled'
              }
            </p>
            {(searchTerm || statusFilter !== 'All Statuses') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All Statuses');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Appointment</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this appointment? This action cannot be undone and will notify both the patient and doctor.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDeleteAppointment(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
