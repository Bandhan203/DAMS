import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Edit, 
  Trash2, 
  Plus, 
  Filter, 
  Search,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  MapPin,
  Activity,
  Download,
  CalendarPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import AppointmentForm from './AppointmentForm';
import { format } from 'date-fns';

const AppointmentList = () => {
  const { appointments, patients, doctors, deleteAppointment, updateAppointment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

  const getPatientInfo = (patientId) => {
    return patients.find(p => p.id === patientId);
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'from-blue-500 to-blue-600 text-white',
      confirmed: 'from-green-500 to-green-600 text-white',
      'in-progress': 'from-yellow-500 to-yellow-600 text-white',
      completed: 'from-gray-500 to-gray-600 text-white',
      cancelled: 'from-red-500 to-red-600 text-white',
      'no-show': 'from-red-500 to-red-600 text-white'
    };
    return colors[status] || 'from-gray-500 to-gray-600 text-white';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
      case 'no-show':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      consultation: 'bg-blue-50 text-blue-700',
      'follow-up': 'bg-green-50 text-green-700',
      emergency: 'bg-red-50 text-red-700',
      'routine-checkup': 'bg-purple-50 text-purple-700'
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  const filteredAppointments = appointments.filter(appointment => {
    const patientName = getPatientName(appointment.patientId).toLowerCase();
    const doctorName = getDoctorName(appointment.doctorId).toLowerCase();
    const matchesSearch = patientName.includes(searchTerm.toLowerCase()) || 
                         doctorName.includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    let matchesDate = true;
    if (filterDate === 'today') {
      matchesDate = appointment.date === format(new Date(), 'yyyy-MM-dd');
    } else if (filterDate === 'week') {
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const appointmentDate = new Date(appointment.date);
      matchesDate = appointmentDate >= today && appointmentDate <= weekFromNow;
    }
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointment(appointmentId, { status: newStatus });
  };

  const handleEdit = (appointmentId) => {
    setEditingAppointment(appointmentId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Appointment Schedule
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Comprehensive appointment management and tracking</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowForm(true)} 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
            >
              <CalendarPlus className="w-4 h-4" />
              New Appointment
            </Button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients or doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-xl font-semibold">
            <Activity className="w-4 h-4" />
            <span>{filteredAppointments.length} appointments</span>
          </div>
        </div>
      </div>
        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => {
              const patient = getPatientInfo(appointment.patientId);
              return (
                <div key={appointment.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{getPatientName(appointment.patientId)}</h3>
                        <p className="text-blue-600 font-semibold">{getDoctorName(appointment.doctorId)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getStatusColor(appointment.status)} rounded-xl shadow-lg font-semibold`}>
                        {getStatusIcon(appointment.status)}
                        <span className="capitalize">{appointment.status.replace('-', ' ')}</span>
                      </div>
                      <div className="flex gap-2 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleEdit(appointment.id)}
                          className="p-3 bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                          title="Edit Appointment"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                          title="Send Message"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className="p-3 bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                          title="Delete Appointment"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200/50">
                      <div className="p-2 bg-green-200 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Date</p>
                        <p className="font-semibold text-green-800">{format(new Date(appointment.date), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
                      <div className="p-2 bg-blue-200 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Time</p>
                        <p className="font-semibold text-blue-800">{appointment.time} ({appointment.duration} min)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200/50">
                      <div className="p-2 bg-purple-200 rounded-lg">
                        <Phone className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Contact</p>
                        <p className="font-semibold text-purple-800">{patient?.phone || 'No phone'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200/50">
                      <div className="p-2 bg-orange-200 rounded-lg">
                        <Activity className="w-5 h-5 text-orange-700" />
                      </div>
                      <div>
                        <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">Type</p>
                        <p className="font-semibold text-orange-800 capitalize">{appointment.type.replace('-', ' ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {appointment.symptoms && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200/50">
                      <p className="text-sm font-semibold text-yellow-700 mb-2">Symptoms:</p>
                      <p className="text-sm text-yellow-800">{appointment.symptoms}</p>
                    </div>
                  )}
                  
                  {appointment.notes && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                      <p className="text-sm font-semibold text-blue-700 mb-2">Notes:</p>
                      <p className="text-sm text-blue-800">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No appointments found</h3>
              <p className="text-gray-600 mb-6 text-lg">No appointments match your current filters.</p>
              <Button 
                onClick={() => setShowForm(true)} 
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
              >
                <CalendarPlus className="w-5 h-5" />
                Schedule New Appointment
              </Button>
            </div>
          )}
        </div>
      
      {/* Appointment Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={handleCloseForm}
        title={editingAppointment ? 'Edit Appointment' : 'New Appointment'}
        size="lg"
      >
        <AppointmentForm
          appointmentId={editingAppointment}
          onClose={handleCloseForm}
        />
      </Modal>
    </div>
  );
};

export default AppointmentList;
