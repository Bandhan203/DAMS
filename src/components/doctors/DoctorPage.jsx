import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  Star,
  Users,
  ChevronDown,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  UserPlus,
  Filter,
  Download,
  MapPin,
  User,
  Eye,
  MessageCircle,
  Droplet
} from 'lucide-react';

const DoctorPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showDoctorDetails, setShowDoctorDetails] = useState(null);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sadia',
      specialty: 'Dermatologist',
      experience: 15,
      phone: '+880 1712-345678',
      email: 'sadia@medicarepro.com',
      status: 'Available',
      rating: 4.9,
      fee: 700,
      location: 'Medicare pro ',
      reviews: 245,
      patients: 700,
      nextAvailable: '2:30 PM Today',
      education: 'MBBS, MD (Dermatology)',
      department: 'Dermatology',
      schedule: 'Mon-Fri: 9:00 AM - 5:00 PM',
      biography: 'Dr. Sadia is a highly experienced dermatologist with over 15 years of practice. She specializes in skin disorders and cosmetic dermatology.',
      qualifications: ['MBBS from Dhaka Medical College', 'MD in Dermatology from BSMMU', 'Fellowship in Cosmetic Dermatology']
    },
    {
      id: 2,
      name: 'Dr. Rahman',
      specialty: 'Cardiologist',
      experience: 12,
      phone: '+880 1712-987654',
      email: 'rahman@medicarepro.com',
      status: 'Available',
      rating: 4.8,
      fee: 800,
      location: 'Medicare pro',
      reviews: 189,
      patients: 980,
      nextAvailable: '4:00 PM Today',
      education: 'MBBS, MD (Cardiology)',
      department: 'Cardiology',
      schedule: 'Mon-Wed-Fri: 10:00 AM - 6:00 PM',
      biography: 'Dr. Rahman is a renowned cardiologist with expertise in treating complex cardiac disorders. He has published numerous research papers in international journals.',
      qualifications: ['MBBS from Chittagong Medical College', 'MD in Cardiology from BSMMU', 'Fellowship in Interventional Cardiology']
    },
    {
      id: 3,
      name: 'Dr. Mehedi Hasan',
      specialty: 'Pediatrician',
      experience: 8,
      phone: '+880 1712-555123',
      email: 'mehedi@medicarepro.com',
      status: 'Available',
      rating: 4.7,
      fee: 900,
      location: 'Medicare pro',
      reviews: 156,
      patients: 750,
      nextAvailable: 'Tomorrow 9:00 AM',
      education: 'MBBS, DCH',
      department: 'Pediatrics',
      schedule: 'Mon-Sat: 8:00 AM - 4:00 PM',
      biography: 'Dr. Mehedi Hasan is a dedicated pediatrician who specializes in child healthcare and development. He has a gentle approach with children and their families.',
      qualifications: ['MBBS from Sylhet MAG Osmani Medical College', 'DCH from Institute of Child Health', 'Training in Neonatal Care']
    }
  ];

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Get unique specialties for filter dropdown
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  // Handler functions for all buttons
  const handleAddDoctor = () => {
    // Navigate to add doctor form or open modal
    navigate('/doctors/add');
  };

  const handleExportData = () => {
    // Export doctor data to CSV/Excel
    const csvContent = doctors.map(doctor => 
      `${doctor.name},${doctor.specialty},${doctor.experience},${doctor.phone},${doctor.email},${doctor.rating},${doctor.fee},${doctor.status}`
    ).join('\n');
    
    const header = 'Name,Specialty,Experience,Phone,Email,Rating,Fee,Status\n';
    const blob = new Blob([header + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'doctors_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleEditDoctor = (doctorId) => {
    // Navigate to edit doctor form
    navigate(`/doctors/edit/${doctorId}`);
  };

  const handleDeleteDoctor = (doctorId) => {
    setShowDeleteConfirm(doctorId);
  };

  const confirmDeleteDoctor = (doctorId) => {
    // Here you would typically make an API call to delete the doctor
    console.log(`Deleting doctor with ID: ${doctorId}`);
    setShowDeleteConfirm(null);
    // You could also update the doctors list or refresh the data
  };

  const handleViewDetails = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    setShowDoctorDetails(doctor);
  };

  const handleScheduleAppointment = (doctorId) => {
    // Navigate to appointment booking with pre-selected doctor
    navigate(`/appointments/new?doctorId=${doctorId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecialtyFilter = (specialty) => {
    setSelectedSpecialty(specialty);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Doctor Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage doctor profiles and comprehensive medical information</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleAddDoctor}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              Add Doctor
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

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200/30 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Side - Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search doctors by name, specialty..."
                className="pl-12 pr-4 py-3 border-2 border-blue-200/50 rounded-xl w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
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
                  <h4 className="font-semibold text-gray-800 mb-3">Filter by Specialty</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSpecialtyFilter('')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedSpecialty === '' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      All Specialties
                    </button>
                    {specialties.map(specialty => (
                      <button
                        key={specialty}
                        onClick={() => handleSpecialtyFilter(specialty)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedSpecialty === specialty ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Doctor Count and Stats */}
          <div className="flex items-center gap-6">
            {/* Doctor Count */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-xl font-semibold">
              <Users className="h-5 w-5" />
              <span>{filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} {searchTerm || selectedSpecialty ? 'Found' : 'Active'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden">
            {/* Card Header with Action Buttons */}
            <div className="p-6 border-b border-blue-100/50 relative">
              <div className="absolute top-4 right-4 flex gap-2 opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditDoctor(doctor.id);
                  }}
                  className="p-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                  title="Edit Doctor"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDoctor(doctor.id);
                  }}
                  className="p-2 bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                  title="Delete Doctor"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-blue-700 transition-colors duration-300">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg">{doctor.specialty}</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">{doctor.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">{doctor.email}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{doctor.experience} Years</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Experience</p>
                </div>

                <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200/50">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-600 fill-current" />
                    <span className="text-sm font-semibold text-yellow-700">{doctor.rating}</span>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">Rating</p>
                </div>
              </div>

              {/* Fee */}
              <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                <div className="flex items-center justify-between">
                  <span className="text-purple-700 font-bold text-lg">৳{doctor.fee}</span>
                  <span className="text-xs text-purple-600 bg-purple-200 px-2 py-1 rounded-lg">Consultation Fee</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center">
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg">
                  {doctor.status}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0 space-y-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(doctor.id);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105"
              >
                View Details
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleScheduleAppointment(doctor.id);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Appointment
              </button>
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {filteredDoctors.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <Users className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Doctors Found</h3>
            <p className="text-gray-500 text-center mb-4">
              {searchTerm || selectedSpecialty 
                ? 'Try adjusting your search criteria or filters'
                : 'No doctors are currently registered in the system'
              }
            </p>
            {(searchTerm || selectedSpecialty) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Doctor Details Modal */}
      {showDoctorDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Doctor Profile</h3>
              <button
                onClick={() => setShowDoctorDetails(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Doctor Header */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white ${
                      showDoctorDetails.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{showDoctorDetails.name}</h4>
                    <p className="text-blue-600 font-semibold text-lg mb-2">{showDoctorDetails.specialty}</p>
                    <p className="text-gray-600 mb-3">{showDoctorDetails.education}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-bold text-lg">{showDoctorDetails.rating}</span>
                        <span className="text-gray-600">({showDoctorDetails.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{showDoctorDetails.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{showDoctorDetails.patients} patients</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-700 mb-1">৳{showDoctorDetails.fee}</div>
                    <div className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-lg">Consultation Fee</div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Phone:</span>
                        <p className="text-gray-900">{showDoctorDetails.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Email:</span>
                        <p className="text-gray-900">{showDoctorDetails.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Location:</span>
                        <p className="text-gray-900">{showDoctorDetails.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4">Schedule & Availability</h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Schedule:</span>
                        <p className="text-gray-900">{showDoctorDetails.schedule}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Next Available:</span>
                        <p className="text-green-600 font-medium">{showDoctorDetails.nextAvailable}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${showDoctorDetails.status === 'Available' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <div className={`w-3 h-3 rounded-full ${showDoctorDetails.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Status:</span>
                        <p className={`font-medium ${showDoctorDetails.status === 'Available' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {showDoctorDetails.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biography */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">About</h5>
                <p className="text-gray-700 leading-relaxed">{showDoctorDetails.biography}</p>
              </div>

              {/* Qualifications */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">Education & Qualifications</h5>
                <ul className="space-y-2">
                  {showDoctorDetails.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDoctorDetails(null);
                    handleScheduleAppointment(showDoctorDetails.id);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
                <button
                  onClick={() => {
                    setShowDoctorDetails(null);
                    handleEditDoctor(showDoctorDetails.id);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    // Open messaging interface
                    console.log('Opening message interface');
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Doctor</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this doctor? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDeleteDoctor(showDeleteConfirm)}
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

export default DoctorPage;
