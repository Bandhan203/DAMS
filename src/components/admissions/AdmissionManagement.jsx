import { useState, useEffect } from 'react';
import { Plus, Search, Bed, Clock, CheckCircle, AlertCircle, User, Calendar, FileText, ArrowUpDown, Printer } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const AdmissionManagement = () => {
  const [admissions, setAdmissions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showDischargeModal, setShowDischargeModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('admissions');

  // Dummy data for admissions
  const dummyAdmissions = [
    {
      id: 1,
      admissionNo: 'ADM2024001',
      patientName: 'John Smith',
      patientId: 'P001',
      age: 45,
      gender: 'Male',
      doctorName: 'Dr. Wilson',
      admissionDate: '2024-08-25',
      admissionTime: '14:30',
      roomNo: 'R101',
      bedNo: 'B1',
      department: 'Cardiology',
      condition: 'Chest Pain',
      status: 'Admitted',
      priority: 'High',
      insurance: 'Blue Cross',
      emergencyContact: 'Jane Smith - 555-0123',
      expectedDischarge: '2024-08-30'
    },
    {
      id: 2,
      admissionNo: 'ADM2024002',
      patientName: 'Sarah Johnson',
      patientId: 'P002',
      age: 32,
      gender: 'Female',
      doctorName: 'Dr. Anderson',
      admissionDate: '2024-08-26',
      admissionTime: '09:15',
      roomNo: 'R205',
      bedNo: 'B3',
      department: 'Gynecology',
      condition: 'Surgery Recovery',
      status: 'Recovering',
      priority: 'Normal',
      insurance: 'Aetna',
      emergencyContact: 'Mike Johnson - 555-0456',
      expectedDischarge: '2024-08-29'
    },
    {
      id: 3,
      admissionNo: 'ADM2024003',
      patientName: 'Mike Davis',
      patientId: 'P003',
      age: 67,
      gender: 'Male',
      doctorName: 'Dr. Brown',
      admissionDate: '2024-08-20',
      admissionTime: '16:45',
      roomNo: 'R301',
      bedNo: 'B2',
      department: 'Orthopedics',
      condition: 'Hip Fracture',
      status: 'Discharged',
      priority: 'Normal',
      insurance: 'Medicare',
      emergencyContact: 'Lisa Davis - 555-0789',
      dischargeDate: '2024-08-27',
      dischargeTime: '11:30'
    }
  ];

  // Dummy data for rooms
  const dummyRooms = [
    {
      id: 1,
      roomNo: 'R101',
      department: 'Cardiology',
      type: 'Private',
      beds: [
        { bedNo: 'B1', status: 'Occupied', patientName: 'John Smith' },
        { bedNo: 'B2', status: 'Available', patientName: null }
      ],
      facilities: ['AC', 'TV', 'Private Bathroom'],
      dailyRate: 150.00
    },
    {
      id: 2,
      roomNo: 'R205',
      department: 'Gynecology',
      type: 'Semi-Private',
      beds: [
        { bedNo: 'B1', status: 'Available', patientName: null },
        { bedNo: 'B2', status: 'Available', patientName: null },
        { bedNo: 'B3', status: 'Occupied', patientName: 'Sarah Johnson' },
        { bedNo: 'B4', status: 'Maintenance', patientName: null }
      ],
      facilities: ['AC', 'Shared TV'],
      dailyRate: 100.00
    },
    {
      id: 3,
      roomNo: 'R301',
      department: 'Orthopedics',
      type: 'General Ward',
      beds: [
        { bedNo: 'B1', status: 'Available', patientName: null },
        { bedNo: 'B2', status: 'Available', patientName: null },
        { bedNo: 'B3', status: 'Available', patientName: null },
        { bedNo: 'B4', status: 'Available', patientName: null }
      ],
      facilities: ['Fan', 'Shared Bathroom'],
      dailyRate: 75.00
    }
  ];

  useEffect(() => {
    setAdmissions(dummyAdmissions);
    setRooms(dummyRooms);
  }, []);

  const [newAdmission, setNewAdmission] = useState({
    patientName: '',
    patientId: '',
    age: '',
    gender: '',
    doctorName: '',
    department: '',
    condition: '',
    priority: 'Normal',
    roomNo: '',
    bedNo: '',
    insurance: '',
    emergencyContact: '',
    expectedDischarge: ''
  });

  const [dischargeData, setDischargeData] = useState({
    dischargeDate: '',
    dischargeTime: '',
    dischargeSummary: '',
    medications: '',
    followUpInstructions: '',
    dischargedBy: ''
  });

  const handleAddAdmission = () => {
    const admission = {
      id: admissions.length + 1,
      admissionNo: `ADM2024${String(admissions.length + 4).padStart(3, '0')}`,
      ...newAdmission,
      age: parseInt(newAdmission.age),
      admissionDate: new Date().toISOString().split('T')[0],
      admissionTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      status: 'Admitted'
    };
    setAdmissions([...admissions, admission]);
    setNewAdmission({
      patientName: '',
      patientId: '',
      age: '',
      gender: '',
      doctorName: '',
      department: '',
      condition: '',
      priority: 'Normal',
      roomNo: '',
      bedNo: '',
      insurance: '',
      emergencyContact: '',
      expectedDischarge: ''
    });
    setShowAdmissionModal(false);
  };

  const handleDischarge = () => {
    const updatedAdmissions = admissions.map(admission =>
      admission.id === selectedAdmission.id
        ? { 
            ...admission, 
            status: 'Discharged',
            ...dischargeData
          }
        : admission
    );
    setAdmissions(updatedAdmissions);
    setDischargeData({
      dischargeDate: '',
      dischargeTime: '',
      dischargeSummary: '',
      medications: '',
      followUpInstructions: '',
      dischargedBy: ''
    });
    setSelectedAdmission(null);
    setShowDischargeModal(false);
  };

  // New handler functions for button functionality
  const handleViewDetails = (admission) => {
    setSelectedAdmission(admission);
    setShowDetailsModal(true);
  };

  const handleViewMedicalRecord = (admission) => {
    setSelectedAdmission(admission);
    setShowMedicalRecordModal(true);
  };

  const handleManageRoom = (room) => {
    setSelectedRoom(room);
    // Show room management functionality
    alert(`Managing room ${room.roomNo} in ${room.department} department.
    
Room Details:
- Type: ${room.type}
- Daily Rate: $${room.dailyRate}
- Available Beds: ${room.beds.filter(bed => bed.status === 'Available').length}
- Occupied Beds: ${room.beds.filter(bed => bed.status === 'Occupied').length}
    
Actions available:
- Assign/Unassign patients
- Update room status
- Modify facilities
- Adjust pricing`);
  };

  const handleRoomMaintenance = (room) => {
    setSelectedRoom(room);
    // Update room beds to maintenance status
    const updatedRooms = rooms.map(r =>
      r.id === room.id
        ? {
            ...r,
            beds: r.beds.map(bed => ({ ...bed, status: 'Maintenance' }))
          }
        : r
    );
    setRooms(updatedRooms);
    
    alert(`Room ${room.roomNo} has been marked for maintenance.
    
Maintenance Actions:
- All beds marked as under maintenance
- Room temporarily unavailable for new admissions
- Maintenance staff has been notified
- Estimated completion: 2-4 hours
    
Current status: Maintenance Mode Active`);
  };

  const handleUpdateAdmissionStatus = (admissionId, newStatus) => {
    const updatedAdmissions = admissions.map(admission =>
      admission.id === admissionId
        ? { ...admission, status: newStatus }
        : admission
    );
    setAdmissions(updatedAdmissions);
  };

  const handleTransferPatient = (admission) => {
    // Simulate patient transfer
    const availableRooms = rooms.filter(room => 
      room.beds.some(bed => bed.status === 'Available')
    );
    
    if (availableRooms.length > 0) {
      const newRoom = availableRooms[0];
      const availableBed = newRoom.beds.find(bed => bed.status === 'Available');
      
      alert(`Transfer Request for ${admission.patientName}
      
Current Location: ${admission.roomNo}/${admission.bedNo}
Proposed New Location: ${newRoom.roomNo}/${availableBed.bedNo}
Department: ${newRoom.department}
      
Transfer reason: Medical requirement/Room upgrade
Estimated transfer time: 30 minutes
      
Would you like to proceed with the transfer?`);
    } else {
      alert('No available rooms for transfer at this time.');
    }
  };

  const filteredAdmissions = admissions.filter(admission =>
    admission.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admission.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admission.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Admitted':
        return 'bg-blue-100 text-blue-800';
      case 'Recovering':
        return 'bg-yellow-100 text-yellow-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'Discharged':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBedStatusColor = (status) => {
    switch (status) {
      case 'Occupied':
        return 'bg-red-100 text-red-800';
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Admission Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage patient admissions and discharges efficiently</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAdmissionModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              New Admission
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {admissions.filter(a => a.status === 'Admitted').length}
              </p>
              <p className="text-gray-600 font-medium">Current Admissions</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {admissions.filter(a => a.status === 'Recovering').length}
              </p>
              <p className="text-gray-600 font-medium">Recovering</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {admissions.filter(a => a.status === 'Discharged').length}
              </p>
              <p className="text-gray-600 font-medium">Discharged Today</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Bed className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {rooms.reduce((total, room) => total + room.beds.filter(bed => bed.status === 'Available').length, 0)}
              </p>
              <p className="text-gray-600 font-medium">Available Beds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl p-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('admissions')}
            className={`pb-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === 'admissions'
                ? 'border-blue-500 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Admissions
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`pb-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === 'rooms'
                ? 'border-blue-500 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bed className="w-4 h-4 inline mr-2" />
            Room Management
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${activeTab} by patient, admission number, condition...`}
            className="w-full pl-12 pr-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'admissions' ? (
        <div className="space-y-6">
          {filteredAdmissions.map((admission) => (
            <div key={admission.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{admission.admissionNo}</h3>
                    <p className="text-blue-600 font-semibold">{admission.patientName}</p>
                    <p className="text-gray-600">Age: {admission.age} | Gender: {admission.gender}</p>
                    <p className="text-gray-600">{admission.doctorName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${
                    admission.status === 'Admitted' ? 'from-blue-500 to-blue-600' :
                    admission.status === 'Recovering' ? 'from-yellow-500 to-yellow-600' :
                    admission.status === 'Critical' ? 'from-red-500 to-red-600' :
                    'from-green-500 to-green-600'
                  } text-white rounded-xl shadow-lg font-semibold`}>
                    <Clock className="w-4 h-4" />
                    <span>{admission.status}</span>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${getPriorityColor(admission.priority)}`}>
                    {admission.priority} Priority
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200/50">
                  <div className="p-2 bg-green-200 rounded-lg">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Department</p>
                    <p className="font-semibold text-green-800">{admission.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
                  <div className="p-2 bg-blue-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Condition</p>
                    <p className="font-semibold text-blue-800">{admission.condition}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200/50">
                  <div className="p-2 bg-purple-200 rounded-lg">
                    <Bed className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Room/Bed</p>
                    <p className="font-semibold text-purple-800">{admission.roomNo}/{admission.bedNo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200/50">
                  <div className="p-2 bg-yellow-200 rounded-lg">
                    <FileText className="w-5 h-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Insurance</p>
                    <p className="font-semibold text-yellow-800">{admission.insurance}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-1">Admission Date/Time</p>
                  <p className="font-bold text-gray-900">{admission.admissionDate} at {admission.admissionTime}</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-1">Expected Discharge</p>
                  <p className="font-bold text-gray-900">{admission.expectedDischarge || 'TBD'}</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                <p className="text-sm font-medium text-indigo-600 mb-1">Emergency Contact</p>
                <p className="font-bold text-indigo-900">{admission.emergencyContact}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg font-medium">
                  {admission.status === 'Discharged' ? (
                    <span>Discharged: {admission.dischargeDate} at {admission.dischargeTime}</span>
                  ) : (
                    <span>Admitted: {admission.admissionDate}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {admission.status !== 'Discharged' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAdmission(admission);
                        setShowDischargeModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg hover:shadow-red-200/50 hover:scale-105 transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Discharge
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewMedicalRecord(admission);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
                  >
                    <FileText className="w-4 h-4" />
                    Medical Record
                  </button>
                  {admission.status !== 'Discharged' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTransferPatient(admission);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200/50 hover:scale-105 transition-all duration-300"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                      Transfer
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(admission);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
                  >
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Bed className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{room.roomNo}</h3>
                    <p className="text-blue-600 font-semibold">{room.department}</p>
                    <p className="text-gray-600">{room.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">${room.dailyRate}/day</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Beds:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {room.beds.map((bed) => (
                    <div key={bed.bedNo} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
                      <span className="text-sm font-bold text-gray-900">{bed.bedNo}</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-xl ${getBedStatusColor(bed.status)}`}>
                        {bed.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Facilities:</h4>
                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((facility, index) => (
                    <span key={index} className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-xl font-semibold border border-blue-200">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleManageRoom(room);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
                >
                  <Bed className="w-4 h-4" />
                  Manage
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoomMaintenance(room);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-lg hover:shadow-orange-200/50 hover:scale-105 transition-all duration-300"
                >
                  <AlertCircle className="w-4 h-4" />
                  Maintenance
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Admission Modal */}
      <Modal
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        title="New Patient Admission"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.patientName}
                onChange={(e) => setNewAdmission({ ...newAdmission, patientName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.patientId}
                onChange={(e) => setNewAdmission({ ...newAdmission, patientId: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.age}
                onChange={(e) => setNewAdmission({ ...newAdmission, age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.gender}
                onChange={(e) => setNewAdmission({ ...newAdmission, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.doctorName}
                onChange={(e) => setNewAdmission({ ...newAdmission, doctorName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.department}
                onChange={(e) => setNewAdmission({ ...newAdmission, department: e.target.value })}
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Surgery">Surgery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition/Diagnosis
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.condition}
                onChange={(e) => setNewAdmission({ ...newAdmission, condition: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.priority}
                onChange={(e) => setNewAdmission({ ...newAdmission, priority: e.target.value })}
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Number
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.roomNo}
                onChange={(e) => setNewAdmission({ ...newAdmission, roomNo: e.target.value })}
              >
                <option value="">Select Room</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.roomNo}>
                    {room.roomNo} - {room.department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bed Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.bedNo}
                onChange={(e) => setNewAdmission({ ...newAdmission, bedNo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.insurance}
                onChange={(e) => setNewAdmission({ ...newAdmission, insurance: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Discharge Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAdmission.expectedDischarge}
                onChange={(e) => setNewAdmission({ ...newAdmission, expectedDischarge: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact
            </label>
            <input
              type="text"
              placeholder="Name - Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newAdmission.emergencyContact}
              onChange={(e) => setNewAdmission({ ...newAdmission, emergencyContact: e.target.value })}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAdmissionModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddAdmission}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Admit Patient
            </Button>
          </div>
        </div>
      </Modal>

      {/* Discharge Modal */}
      <Modal
        isOpen={showDischargeModal}
        onClose={() => setShowDischargeModal(false)}
        title={`Discharge Patient - ${selectedAdmission?.patientName}`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discharge Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dischargeData.dischargeDate}
                onChange={(e) => setDischargeData({ ...dischargeData, dischargeDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discharge Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dischargeData.dischargeTime}
                onChange={(e) => setDischargeData({ ...dischargeData, dischargeTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discharge Summary
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={dischargeData.dischargeSummary}
              onChange={(e) => setDischargeData({ ...dischargeData, dischargeSummary: e.target.value })}
              placeholder="Summary of treatment and current condition..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medications
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              value={dischargeData.medications}
              onChange={(e) => setDischargeData({ ...dischargeData, medications: e.target.value })}
              placeholder="List of medications to continue at home..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Follow-up Instructions
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              value={dischargeData.followUpInstructions}
              onChange={(e) => setDischargeData({ ...dischargeData, followUpInstructions: e.target.value })}
              placeholder="Follow-up appointments and care instructions..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discharged By
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dischargeData.dischargedBy}
              onChange={(e) => setDischargeData({ ...dischargeData, dischargedBy: e.target.value })}
              placeholder="Doctor name"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowDischargeModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDischarge}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Discharge Patient
            </Button>
          </div>
        </div>
      </Modal>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Admission Details"
        size="lg"
      >
        {selectedAdmission && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Patient Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedAdmission.patientName}</p>
                  <p><span className="font-medium">Age:</span> {selectedAdmission.age}</p>
                  <p><span className="font-medium">Gender:</span> {selectedAdmission.gender}</p>
                  <p><span className="font-medium">Contact:</span> {selectedAdmission.contactNo}</p>
                  <p><span className="font-medium">Emergency Contact:</span> {selectedAdmission.emergencyContact}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Admission Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Admission ID:</span> {selectedAdmission.id}</p>
                  <p><span className="font-medium">Date:</span> {selectedAdmission.admissionDate}</p>
                  <p><span className="font-medium">Time:</span> {selectedAdmission.admissionTime}</p>
                  <p><span className="font-medium">Department:</span> {selectedAdmission.department}</p>
                  <p><span className="font-medium">Room/Bed:</span> {selectedAdmission.roomNo}/{selectedAdmission.bedNo}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Medical Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><span className="font-medium">Attending Doctor:</span> {selectedAdmission.attendingDoctor}</p>
                  <p><span className="font-medium">Diagnosis:</span> {selectedAdmission.diagnosis}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedAdmission.status === 'Admitted' ? 'bg-green-100 text-green-800' :
                      selectedAdmission.status === 'Critical' ? 'bg-red-100 text-red-800' :
                      selectedAdmission.status === 'Stable' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedAdmission.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p><span className="font-medium">Treatment Plan:</span> {selectedAdmission.treatmentPlan}</p>
                  <p><span className="font-medium">Insurance:</span> {selectedAdmission.insurance}</p>
                  <p><span className="font-medium">Daily Rate:</span> ${selectedAdmission.dailyRate}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleViewMedicalRecord(selectedAdmission);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FileText className="w-4 h-4 mr-1" />
                View Medical Record
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Medical Record Modal */}
      <Modal
        isOpen={showMedicalRecordModal}
        onClose={() => setShowMedicalRecordModal(false)}
        title="Medical Record"
        size="lg"
      >
        {selectedAdmission && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Patient: {selectedAdmission.patientName}</h4>
              <p className="text-sm text-gray-600">Medical Record ID: MR-{selectedAdmission.id}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Chief Complaint</h5>
                <p className="text-gray-600">Patient presented with symptoms of {selectedAdmission.diagnosis.toLowerCase()} requiring immediate medical attention.</p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Vital Signs</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p><span className="font-medium">Blood Pressure:</span> 120/80 mmHg</p>
                    <p><span className="font-medium">Heart Rate:</span> 72 bpm</p>
                    <p><span className="font-medium">Temperature:</span> 98.6°F</p>
                  </div>
                  <div className="space-y-1">
                    <p><span className="font-medium">Respiratory Rate:</span> 16/min</p>
                    <p><span className="font-medium">Oxygen Saturation:</span> 98%</p>
                    <p><span className="font-medium">Weight:</span> 70 kg</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Assessment & Plan</h5>
                <p className="text-gray-600">{selectedAdmission.treatmentPlan}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Medications</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Medication A - 10mg twice daily</li>
                  <li>• Medication B - 5mg once daily</li>
                  <li>• Medication C - As needed for pain</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Progress Notes</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Day 1:</span> Patient admitted, initial assessment completed.</p>
                  <p><span className="font-medium">Day 2:</span> Showing improvement, treatment plan adjusted.</p>
                  <p><span className="font-medium">Day 3:</span> Continued progress, preparing for potential discharge.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowMedicalRecordModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  alert('Medical record printed successfully!');
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Printer className="w-4 h-4 mr-1" />
                Print Record
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdmissionManagement;
