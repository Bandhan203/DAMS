import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Award,
  GraduationCap,
  Heart,
  Users,
  User,
  TrendingUp,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  DollarSign,
  Languages,
  Badge
} from 'lucide-react';

const DoctorDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const doctor = {
    id: 1,
    name: 'Dr. Sadia Rahman',
    specialty: 'Cardiologist',
    subSpecialty: 'Interventional Cardiology',
    experience: 15,
    phone: '+880 1712-345678',
    email: 'sadia.rahman@medicarepro.com',
    location: 'Dhaka Medical College & Hospital',
    address: '2 Secretariat Rd, Dhaka 1000, Bangladesh',
    status: 'Available',
    rating: 4.9,
    reviews: 245,
    fee: 1500,
    nextAvailable: '2:30 PM Today',
    patients: 1200,
    successRate: 98,
    languages: ['Bengali', 'English', 'Hindi'],
    education: [
      'MBBS - Dhaka Medical College (2008)',
      'MD in Cardiology - NICVD (2012)',
      'Fellowship in Interventional Cardiology - Singapore (2014)'
    ],
    specializations: [
      'Coronary Angioplasty',
      'Pacemaker Implantation',
      'Cardiac Catheterization',
      'Echocardiography'
    ],
    achievements: [
      'Best Cardiologist Award 2023',
      'Excellence in Patient Care 2022',
      'Medical Innovation Award 2021'
    ],
    about: 'Dr. Sadia Rahman is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2000 successful procedures. She is known for her compassionate patient care and innovative treatment approaches.'
  };

  const reviews = [
    {
      id: 1,
      patientName: 'Sarah Ahmed',
      rating: 5,
      comment: 'Excellent doctor! Very professional and caring. Explained everything clearly.',
      date: '2 days ago',
      verified: true
    },
    {
      id: 2,
      patientName: 'Rahman Khan',
      rating: 5,
      comment: 'Best cardiologist in Dhaka. Highly recommended for heart problems.',
      date: '1 week ago',
      verified: true
    },
    {
      id: 3,
      patientName: 'Fatima Ali',
      rating: 4,
      comment: 'Good experience overall. Professional staff and modern facilities.',
      date: '2 weeks ago',
      verified: true
    }
  ];

  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '9:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '2:00 PM', available: true },
    { time: '2:30 PM', available: true },
    { time: '3:00 PM', available: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Back Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-xl border border-blue-200/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-gray-700 hover:text-blue-700">
        <ChevronLeft className="w-4 h-4" />
        Back to Doctors
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doctor Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Profile Card */}
          <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <User className="w-16 h-16 text-white" />
                </div>
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                  doctor.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                    <p className="text-xl text-blue-600 font-semibold mb-1">{doctor.specialty}</p>
                    <p className="text-gray-600">{doctor.subSpecialty}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-lg font-bold text-gray-900">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">{doctor.reviews} Reviews</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-gray-900">{doctor.experience}y</span>
                    </div>
                    <p className="text-xs text-gray-600">Experience</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-lg font-bold text-gray-900">{doctor.patients}</span>
                    </div>
                    <p className="text-xs text-gray-600">Patients</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{doctor.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl">
            <div className="flex border-b border-blue-100/50">
              {['overview', 'reviews', 'availability'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 font-semibold capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'text-blue-700 border-b-2 border-blue-600 bg-gradient-to-t from-blue-50/50 to-transparent'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* About */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About Dr. {doctor.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      Education
                    </h3>
                    <div className="space-y-2">
                      {doctor.education.map((edu, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/50 to-transparent rounded-xl">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      Specializations
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {doctor.specializations.map((spec, index) => (
                        <div key={index} className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                          <span className="text-blue-700 font-medium">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Languages className="w-5 h-5 text-purple-600" />
                      Languages
                    </h3>
                    <div className="flex gap-2">
                      {doctor.languages.map((lang, index) => (
                        <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-lg font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gradient-to-r from-white/80 to-blue-50/80 rounded-xl border border-blue-100/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-semibold">
                            {review.patientName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.patientName}</h4>
                            {review.verified && (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Verified Patient
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'availability' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots - Today</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        disabled={!slot.available}
                        className={`p-3 rounded-xl font-medium transition-all duration-300 ${
                          slot.available
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:scale-105'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Appointment Booking */}
          <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200/30">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Appointment</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 font-bold text-2xl">৳{doctor.fee}</span>
                  <span className="text-sm text-blue-600 bg-blue-200 px-2 py-1 rounded-lg">Consultation</span>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200/50">
                <div className="flex items-center gap-2 text-green-700">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Next Available: {doctor.nextAvailable}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>

              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200/30">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Achievements
            </h3>
            <div className="space-y-3">
              {doctor.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200/50">
                  <Badge className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-700 font-medium text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200/30">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Success Rate
            </h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{doctor.successRate}%</div>
              <p className="text-gray-600">Treatment Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
