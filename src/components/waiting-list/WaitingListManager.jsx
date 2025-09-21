import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Plus, 
  Phone, 
  Mail, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Search,
  Filter,
  UserCheck,
  Bell,
  ArrowRight,
  Timer,
  Star,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { format } from 'date-fns';

const WaitingListManager = () => {
  const { 
    waitingList, 
    doctors,
    addToWaitingList, 
    updateWaitingListEntry, 
    removeFromWaitingList 
  } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterPriority, setFilterPriority] = useState('All Priority');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Statistics
  const stats = [
    { label: 'Total Waiting', value: waitingList.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'High Priority', value: waitingList.filter(w => w.priority === 'High').length, icon: AlertCircle, color: 'bg-red-50 text-red-600' },
    { label: 'Avg Wait Time', value: '3.5 days', icon: Timer, color: 'bg-orange-50 text-orange-600' },
    { label: 'Scheduled Today', value: waitingList.filter(w => w.status === 'Scheduled').length, icon: CheckCircle, color: 'bg-green-50 text-green-600' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-blue-100 text-blue-700',
      'Notified': 'bg-yellow-100 text-yellow-700',
      'Scheduled': 'bg-green-100 text-green-700',
      'Expired': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'Low': 'bg-green-100 text-green-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const filteredWaitingList = waitingList.filter(entry => {
    const matchesSearch = entry.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All Status' || entry.status === filterStatus;
    const matchesPriority = filterPriority === 'All Priority' || entry.priority === filterPriority;
    const matchesDoctor = filterDoctor === 'all' || entry.doctorId === filterDoctor;
    return matchesSearch && matchesStatus && matchesPriority && matchesDoctor;
  });

  const getPriorityLabel = (priority) => {
    if (priority <= 2) return 'High';
    if (priority <= 5) return 'Medium';
    return 'Low';
  };

  const handleNotifyPatient = (entryId) => {
    updateWaitingListEntry(entryId, { 
      status: 'notified',
      notifiedAt: new Date().toISOString()
    });
  };

  const handleScheduleAppointment = (entryId) => {
    updateWaitingListEntry(entryId, { status: 'scheduled' });
    // In a real app, this would also create an appointment
  };

  const handleAddToWaitingList = (e) => {
    e.preventDefault();
    if (!newEntry.patientId || !newEntry.doctorId || !newEntry.preferredDate) return;
    addToWaitingList({
      ...newEntry,
      status: 'active'
    });
    setNewEntry({
      patientId: '',
      doctorId: '',
      preferredDate: '',
      preferredTime: '',
      priority: 1
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <Card
        title="Waiting List Management"
        subtitle="Manage patient waiting lists and notifications"
        action={
          <Button onClick={() => setShowAddForm(true)} icon={Plus}>
            Add to Waiting List
          </Button>
        }
      >
        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active</p>
                <p className="text-2xl font-bold text-blue-900">
                  {waitingList.filter(e => e.status === 'active').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Notified</p>
                <p className="text-2xl font-bold text-amber-900">
                  {waitingList.filter(e => e.status === 'notified').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Scheduled</p>
                <p className="text-2xl font-bold text-green-900">
                  {waitingList.filter(e => e.status === 'scheduled').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Expired</p>
                <p className="text-2xl font-bold text-red-900">
                  {waitingList.filter(e => e.status === 'expired').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="notified">Notified</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Doctors</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {filteredWaitingList.length} entries
          </div>
        </div>
        {/* Waiting List */}
        <div className="space-y-4">
          {filteredWaitingList.length > 0 ? (
            filteredWaitingList.map((entry) => {
              const patient = getPatientInfo(entry.patientId);
              return (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient'}
                        </h3>
                        <p className="text-sm text-gray-600">{getDoctorName(entry.doctorId)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(entry.priority)}`}>
                        {getPriorityLabel(entry.priority)} Priority
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(entry.status)}`}>
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(entry.preferredDate), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {entry.preferredTime || 'Any time'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {patient?.phone || 'No phone'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {patient?.email || 'No email'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Added: {format(new Date(entry.createdAt), 'MMM d, yyyy h:mm a')}
                      {entry.notifiedAt && (
                        <span className="ml-4">
                          Notified: {format(new Date(entry.notifiedAt), 'MMM d, yyyy h:mm a')}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {entry.status === 'active' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleNotifyPatient(entry.id)}
                        >
                          Notify Patient
                        </Button>
                      )}
                      {entry.status === 'notified' && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleScheduleAppointment(entry.id)}
                        >
                          Schedule
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromWaitingList(entry.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No waiting list entries</h3>
              <p className="text-gray-600 mb-4">No entries match your current filters.</p>
              <Button onClick={() => setShowAddForm(true)} icon={Plus}>
                Add First Entry
              </Button>
            </div>
          )}
        </div>
      </Card>
      {/* Add to Waiting List Modal */}
      <Modal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add to Waiting List"
        size="lg"
      >
        <form onSubmit={handleAddToWaitingList} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
                Patient *
              </label>
              <select
                id="patientId"
                value={newEntry.patientId}
                onChange={(e) => setNewEntry(prev => ({ ...prev, patientId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select a patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-2">
                Doctor *
              </label>
              <select
                id="doctorId"
                value={newEntry.doctorId}
                onChange={(e) => setNewEntry(prev => ({ ...prev, doctorId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                id="preferredDate"
                value={newEntry.preferredDate}
                onChange={(e) => setNewEntry(prev => ({ ...prev, preferredDate: e.target.value }))}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                id="preferredTime"
                value={newEntry.preferredTime}
                onChange={(e) => setNewEntry(prev => ({ ...prev, preferredTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                id="priority"
                value={newEntry.priority}
                onChange={(e) => setNewEntry(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value={1}>High Priority (1)</option>
                <option value={2}>High Priority (2)</option>
                <option value={3}>Medium Priority (3)</option>
                <option value={4}>Medium Priority (4)</option>
                <option value={5}>Medium Priority (5)</option>
                <option value={6}>Low Priority (6)</option>
                <option value={7}>Low Priority (7)</option>
                <option value={8}>Low Priority (8)</option>
                <option value={9}>Low Priority (9)</option>
                <option value={10}>Low Priority (10)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add to Waiting List
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WaitingListManager;
