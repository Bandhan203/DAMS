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
  User,
  ChevronDown,
  Edit,
  Trash2
} from 'lucide-react';

const WaitingListManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterPriority, setFilterPriority] = useState('All Priority');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock waiting list data
  const waitingListData = [
    {
      id: 1,
      patient: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        email: 'sarah.j@email.com',
        age: 34,
        avatar: '👩'
      },
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      requestedDate: '2025-08-15',
      requestedTime: '10:00 AM',
      addedDate: '2025-08-10',
      waitTime: '4 days',
      priority: 'High',
      status: 'Active',
      reason: 'Chest pain consultation',
      estimatedWait: '2-3 days',
      lastContact: '2025-08-12'
    },
    {
      id: 2,
      patient: {
        name: 'Michael Rodriguez',
        phone: '+1 (555) 234-5678',
        email: 'm.rodriguez@email.com',
        age: 28,
        avatar: '👨'
      },
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Dermatologist',
      requestedDate: '2025-08-16',
      requestedTime: '2:30 PM',
      addedDate: '2025-08-11',
      waitTime: '3 days',
      priority: 'Medium',
      status: 'Notified',
      reason: 'Skin condition check',
      estimatedWait: '1-2 days',
      lastContact: '2025-08-13'
    },
    {
      id: 3,
      patient: {
        name: 'Emily Davis',
        phone: '+1 (555) 345-6789',
        email: 'emily.davis@email.com',
        age: 45,
        avatar: '👩'
      },
      doctor: 'Dr. James Thompson',
      specialty: 'Orthopedic',
      requestedDate: '2025-08-18',
      requestedTime: '9:15 AM',
      addedDate: '2025-08-09',
      waitTime: '5 days',
      priority: 'High',
      status: 'Active',
      reason: 'Knee injury follow-up',
      estimatedWait: '3-4 days',
      lastContact: '2025-08-11'
    },
    {
      id: 4,
      patient: {
        name: 'David Wilson',
        phone: '+1 (555) 456-7890',
        email: 'd.wilson@email.com',
        age: 52,
        avatar: '👨'
      },
      doctor: 'Dr. Lisa Zhang',
      specialty: 'Endocrinologist',
      requestedDate: '2025-08-17',
      requestedTime: '11:45 AM',
      addedDate: '2025-08-12',
      waitTime: '2 days',
      priority: 'Medium',
      status: 'Scheduled',
      reason: 'Diabetes management',
      estimatedWait: 'Confirmed',
      lastContact: '2025-08-14'
    },
    {
      id: 5,
      patient: {
        name: 'Jennifer Lee',
        phone: '+1 (555) 567-8901',
        email: 'j.lee@email.com',
        age: 31,
        avatar: '👩'
      },
      doctor: 'Dr. Robert Kim',
      specialty: 'Psychiatrist',
      requestedDate: '2025-08-20',
      requestedTime: '3:00 PM',
      addedDate: '2025-08-13',
      waitTime: '1 day',
      priority: 'Low',
      status: 'Active',
      reason: 'Anxiety consultation',
      estimatedWait: '5-7 days',
      lastContact: '2025-08-13'
    },
    {
      id: 6,
      patient: {
        name: 'Robert Garcia',
        phone: '+1 (555) 678-9012',
        email: 'r.garcia@email.com',
        age: 39,
        avatar: '👨'
      },
      doctor: 'Dr. Anna Peterson',
      specialty: 'Ophthalmologist',
      requestedDate: '2025-08-19',
      requestedTime: '1:20 PM',
      addedDate: '2025-08-08',
      waitTime: '6 days',
      priority: 'High',
      status: 'Expired',
      reason: 'Vision problems',
      estimatedWait: 'Needs rescheduling',
      lastContact: '2025-08-10'
    }
  ];

  // Statistics
  const stats = [
    { label: 'Total Waiting', value: waitingListData.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'High Priority', value: waitingListData.filter(w => w.priority === 'High').length, icon: AlertCircle, color: 'bg-red-50 text-red-600' },
    { label: 'Avg Wait Time', value: '3.5 days', icon: Timer, color: 'bg-orange-50 text-orange-600' },
    { label: 'Scheduled Today', value: waitingListData.filter(w => w.status === 'Scheduled').length, icon: CheckCircle, color: 'bg-green-50 text-green-600' }
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

  const filteredWaitingList = waitingListData.filter(entry => {
    const matchesSearch = entry.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All Status' || entry.status === filterStatus;
    const matchesPriority = filterPriority === 'All Priority' || entry.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waiting List Manager</h1>
          <p className="text-gray-600 mt-1">Manage patient waiting list and appointments</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add to Waiting List
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search patients, doctors, or reasons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Notified</option>
                <option>Scheduled</option>
                <option>Expired</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select 
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Waiting List Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWaitingList.map((entry) => (
          <div key={entry.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                  {entry.patient.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{entry.patient.name}</h3>
                  <p className="text-sm text-gray-600">Age: {entry.patient.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(entry.priority)}`}>
                  {entry.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                  {entry.status}
                </span>
              </div>
            </div>

            {/* Patient Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{entry.patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{entry.patient.email}</span>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Doctor</p>
                  <p className="font-medium text-gray-900">{entry.doctor}</p>
                  <p className="text-sm text-gray-600">{entry.specialty}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Requested</p>
                  <p className="font-medium text-gray-900">{entry.requestedDate}</p>
                  <p className="text-sm text-gray-600">{entry.requestedTime}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Reason</p>
                <p className="text-sm text-gray-900">{entry.reason}</p>
              </div>
            </div>

            {/* Timeline Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Wait time:</span>
                <span className="text-sm font-medium text-gray-900">{entry.waitTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Estimated:</span>
                <span className="text-sm font-medium text-gray-900">{entry.estimatedWait}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                  <UserCheck className="w-3 h-3" />
                  Schedule
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                  <Bell className="w-3 h-3" />
                  Notify
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <span className="text-xs text-gray-500">
                Last contact: {entry.lastContact}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWaitingList.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
          <div className="text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No patients in waiting list</h3>
            <p className="text-sm">No patients match your current filters or the waiting list is empty.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitingListManager;
