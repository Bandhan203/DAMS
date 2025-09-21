import React, { useState } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Phone,
  Mail,
  Award,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  TrendingUp,
  ChevronRight,
  Eye,
  MessageCircle,
  Edit,
  Trash2
} from 'lucide-react';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sadia Rahman',
    specialty: 'Cardiologist',
    experience: 15,
    phone: '+880 1712-345678',
    email: 'sadia.rahman@medicarepro.com',
    location: 'Dhaka Medical College',
    status: 'Available',
    rating: 4.9,
    reviews: 245,
    fee: 1500,
    nextAvailable: '2:30 PM Today',
    patients: 1200,
    education: 'MBBS, MD (Cardiology)',
    department: 'Cardiology',
    schedule: 'Mon-Fri: 9:00 AM - 5:00 PM',
    biography: 'Dr. Sadia Rahman is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 500 cardiac procedures.',
    qualifications: ['MBBS from Dhaka Medical College', 'MD in Cardiology from BSMMU', 'Fellowship in Interventional Cardiology']
  },
  {
    id: 2,
    name: 'Dr. Rahman Khan',
    specialty: 'Neurologist',
    experience: 12,
    phone: '+880 1712-987654',
    email: 'rahman.khan@medicarepro.com',
    location: 'Square Hospital',
    status: 'Busy',
    rating: 4.8,
    reviews: 189,
    fee: 1800,
    nextAvailable: '4:00 PM Today',
    patients: 980,
    education: 'MBBS, MD (Neurology)',
    department: 'Neurology',
    schedule: 'Mon-Wed-Fri: 10:00 AM - 6:00 PM',
    biography: 'Dr. Rahman Khan is a renowned neurologist with expertise in treating complex neurological disorders. He has published numerous research papers in international journals.',
    qualifications: ['MBBS from Chittagong Medical College', 'MD in Neurology from BSMMU', 'Fellowship in Neurointervention']
  },
  {
    id: 3,
    name: 'Dr. Mehedi Hasan',
    specialty: 'Pediatrician',
    experience: 8,
    phone: '+880 1712-555123',
    email: 'mehedi.hasan@medicarepro.com',
    location: 'Apollo Hospital',
    status: 'Available',
    rating: 4.7,
    reviews: 156,
    fee: 1200,
    nextAvailable: 'Tomorrow 9:00 AM',
    patients: 750,
    education: 'MBBS, DCH',
    department: 'Pediatrics',
    schedule: 'Mon-Sat: 8:00 AM - 4:00 PM',
    biography: 'Dr. Mehedi Hasan is a dedicated pediatrician who specializes in child healthcare and development. He has a gentle approach with children and their families.',
    qualifications: ['MBBS from Sylhet MAG Osmani Medical College', 'DCH from Institute of Child Health', 'Training in Neonatal Care']
  }
];

const DoctorList = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [showDoctorDetails, setShowDoctorDetails] = useState(null);

  const handleViewProfile = (doctorId) => {
    const doctor = doctorsData.find(d => d.id === doctorId);
    setShowDoctorDetails(doctor);
  };

  const handleBookAppointment = (doctorId) => {
    // Navigate to appointment booking page
    console.log(`Booking appointment with doctor ID: ${doctorId}`);
  };

  const handleEditDoctor = (doctorId) => {
    // Navigate to edit doctor page
    console.log(`Editing doctor with ID: ${doctorId}`);
  };

  const handleDeleteDoctor = (doctorId) => {
    // Show delete confirmation
    console.log(`Deleting doctor with ID: ${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Doctor Directory
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Find and connect with our medical professionals</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-xl font-semibold">
              <Users className="w-4 h-4" />
              <span>{doctorsData.length} Doctors</span>
            </div>
            <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-blue-200/30">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:shadow-lg hover:shadow-gray-200/50 hover:scale-105 transition-all duration-300 border border-gray-200/50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Doctor Cards/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
        {doctorsData.map((doctor) => (
          <div
            key={doctor.id}
            className={`bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden ${
              viewMode === 'list' ? 'p-6' : ''
            }`}
          >
            {viewMode === 'grid' ? (
              <>
                {/* Grid View */}
                <div className="p-6 relative">
                  {/* Action Buttons - Top Right */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDoctor(doctor.id);
                      }}
                      className="p-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                      title="Edit Doctor"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDoctor(doctor.id);
                      }}
                      className="p-2 bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200/50 hover:scale-110 transition-all duration-300 rounded-xl"
                      title="Delete Doctor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Doctor Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        doctor.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-blue-700 transition-colors duration-300">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                        <span className="text-xs text-gray-500">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">{doctor.experience}y</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">Experience</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-700">{doctor.patients}</span>
                      </div>
                      <p className="text-xs text-purple-600 mt-1">Patients</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{doctor.nextAvailable}</span>
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 font-bold text-lg">৳{doctor.fee}</span>
                      <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-lg">Consultation</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProfile(doctor.id);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookAppointment(doctor.id);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* List View */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      doctor.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-blue-700 transition-colors duration-300">
                          {doctor.name}
                        </h3>
                        <p className="text-blue-600 font-semibold text-lg">{doctor.specialty}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{doctor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{doctor.experience} years</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{doctor.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-700 mb-1">৳{doctor.fee}</div>
                        <div className="text-sm text-green-600 font-medium">{doctor.nextAvailable}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProfile(doctor.id);
                      }}
                      className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookAppointment(doctor.id);
                      }}
                      className="p-2 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
                      title="Book Appointment"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDoctor(doctor.id);
                      }}
                      className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-200/50 hover:scale-105 transition-all duration-300"
                      title="Edit Doctor"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDoctor(doctor.id);
                      }}
                      className="p-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-200/50 hover:scale-105 transition-all duration-300"
                      title="Delete Doctor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
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
                    handleBookAppointment(showDoctorDetails.id);
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
    </div>
  );
};

export default DoctorList;
