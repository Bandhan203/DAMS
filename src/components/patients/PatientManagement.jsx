import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  User,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Droplet,
  Filter,
  Download,
  UserPlus
} from 'lucide-react';

const patientsData = [
  {
    id: 1,
    name: 'Panna Akter',
    phone: '0184 567 8900',
    email: 'panna.akter@email.com',
    bloodType: 'A+',
    status: 'Active',
    dateOfBirth: '1990-05-15',
    gender: 'Female',
    address: '123 Main Street, Dhaka, Bangladesh',
    emergencyContact: '0199 123 4567'
  },
  {
    id: 2,
    name: 'Lamiya Khan',
    phone: '0194 567 8901',
    email: 'lamiya.khan@email.com',
    bloodType: 'O-',
    status: 'Active',
    dateOfBirth: '1985-08-22',
    gender: 'Female',
    address: '456 Oak Avenue, Chittagong, Bangladesh',
    emergencyContact: '0188 987 6543'
  },
  {
    id: 3,
    name: 'Sarah Khan',
    phone: '0184 567 8902',
    email: 'sarah.khan@email.com',
    bloodType: 'B+',
    status: 'Active',
    dateOfBirth: '1992-12-10',
    gender: 'Female',
    address: '789 Pine Road, Sylhet, Bangladesh',
    emergencyContact: '0177 456 7890'
  },
  {
    id: 4,
    name: 'Dulal',
    phone: '0184 567 8903',
    email: 'dulal@email.com',
    bloodType: 'AB-',
    status: 'Active',
    dateOfBirth: '1988-03-18',
    gender: 'Male',
    address: '321 Elm Street, Rajshahi, Bangladesh',
    emergencyContact: '0166 234 5678'
  },
  {
    id: 5,
    name: 'Jessica ',
    phone: '0144 567 8904',
    email: 'jessica@email.com',
    bloodType: 'O+',
    status: 'Active',
    dateOfBirth: '1995-07-03',
    gender: 'Female',
    address: '654 Maple Lane, Khulna, Bangladesh',
    emergencyContact: '0155 345 6789'
  },
  {
    id: 6,
    name: 'Robel',
    phone: '0144 567 8905',
    email: 'robel@email.com',
    bloodType: 'A-',
    status: 'Active',
    dateOfBirth: '1987-11-28',
    gender: 'Male',
    address: '987 Cedar Court, Barisal, Bangladesh',
    emergencyContact: '0144 678 9012'
  }
];

const PatientManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All Specialization');
  const [status, setStatus] = useState('All Status');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [showPatientDetails, setShowPatientDetails] = useState(null);

  // Filter patients based on search term, specialization, and blood type
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodType = selectedBloodType === '' || patient.bloodType === selectedBloodType;
    return matchesSearch && matchesBloodType;
  });

  // Get unique blood types for filter
  const bloodTypes = [...new Set(patientsData.map(patient => patient.bloodType))];

  // Handler functions for all buttons
  const handleAddPatient = () => {
    navigate('/patients/add');
  };

  const handleExportData = () => {
    // Export patient data to CSV
    const csvContent = patientsData.map(patient => 
      `${patient.name},${patient.phone},${patient.email},${patient.bloodType},${patient.status}`
    ).join('\n');
    
    const header = 'Name,Phone,Email,Blood Type,Status\n';
    const blob = new Blob([header + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleEditPatient = (patientId) => {
    navigate(`/patients/edit/${patientId}`);
  };

  const handleDeletePatient = (patientId) => {
    setShowDeleteConfirm(patientId);
  };

  const confirmDeletePatient = (patientId) => {
    // Here you would typically make an API call to delete the patient
    console.log(`Deleting patient with ID: ${patientId}`);
    setShowDeleteConfirm(null);
    // You could also update the patients list or refresh the data
  };

  const handleViewDetails = (patientId) => {
    const patient = patientsData.find(p => p.id === patientId);
    setShowPatientDetails(patient);
  };

  const handleViewAppointments = (patientId) => {
    navigate(`/appointments?patientId=${patientId}`);
  };

  const handleBloodTypeFilter = (bloodType) => {
    setSelectedBloodType(bloodType);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Patient Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage patient profiles and comprehensive health information</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleAddPatient}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              Add Patient
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
                placeholder="Search patients by name, phone, or email..."
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
                  <h4 className="font-semibold text-gray-800 mb-3">Filter by Blood Type</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleBloodTypeFilter('')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedBloodType === '' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      All Blood Types
                    </button>
                    {bloodTypes.map(bloodType => (
                      <button
                        key={bloodType}
                        onClick={() => handleBloodTypeFilter(bloodType)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedBloodType === bloodType ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {bloodType}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Specialization Dropdown */}
            <div className="relative">
              <select 
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Specialization</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Neurology</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Patient Count */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-xl font-semibold">
              <User className="w-4 h-4" />
              <span className="text-sm">{filteredPatients.length} {filteredPatients.length === 1 ? 'Patient' : 'Patients'} {searchTerm || selectedBloodType ? 'Found' : 'Total'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 relative hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-100 transition-opacity duration-300">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditPatient(patient.id);
                }}
                className="p-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                title="Edit Patient"
              >
                <Edit className="w-4 h-4" strokeWidth="2.5" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePatient(patient.id);
                }}
                className="p-2 bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                title="Delete Patient"
              >
                <Trash2 className="w-4 h-4" strokeWidth="2.5" />
              </button>
            </div>

            {/* Patient Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{patient.name}</h3>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium text-sm">{patient.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-1.5 bg-red-100 rounded-lg">
                  <Droplet className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-medium">Blood Type: <span className="text-red-600 font-bold">{patient.bloodType}</span></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(patient.id);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewAppointments(patient.id);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                Appointments
              </button>
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {filteredPatients.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <User className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Patients Found</h3>
            <p className="text-gray-500 text-center mb-4">
              {searchTerm || selectedBloodType 
                ? 'Try adjusting your search criteria or filters'
                : 'No patients are currently registered in the system'
              }
            </p>
            {(searchTerm || selectedBloodType) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBloodType('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Patient Details Modal */}
      {showPatientDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Patient Details</h3>
              <button
                onClick={() => setShowPatientDetails(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Patient Basic Info */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{showPatientDetails.name}</h4>
                    <p className="text-gray-600">Patient ID: #{showPatientDetails.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">Phone Number</span>
                    </div>
                    <p className="text-gray-900 font-medium">{showPatientDetails.phone}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">Email Address</span>
                    </div>
                    <p className="text-gray-900 font-medium">{showPatientDetails.email}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Droplet className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-gray-700">Blood Type</span>
                    </div>
                    <p className="text-red-600 font-bold text-lg">{showPatientDetails.bloodType}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${showPatientDetails.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="font-semibold text-gray-700">Status</span>
                    </div>
                    <p className={`font-medium ${showPatientDetails.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                      {showPatientDetails.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-700">Date of Birth:</span>
                    <p className="text-gray-900">{showPatientDetails.dateOfBirth || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Gender:</span>
                    <p className="text-gray-900">{showPatientDetails.gender || 'Not specified'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold text-gray-700">Address:</span>
                    <p className="text-gray-900">{showPatientDetails.address || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Emergency Contact:</span>
                    <p className="text-gray-900">{showPatientDetails.emergencyContact || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPatientDetails(null);
                    handleEditPatient(showPatientDetails.id);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  Edit Patient
                </button>
                <button
                  onClick={() => {
                    setShowPatientDetails(null);
                    handleViewAppointments(showPatientDetails.id);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  View Appointments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Patient</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this patient? This action cannot be undone and will remove all associated medical records.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDeletePatient(showDeleteConfirm)}
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

export default PatientManagement;
