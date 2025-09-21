import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, FileText, Shield, TrendingUp, Star, Award, Zap, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-white" />
            <span className="text-white text-2xl font-bold">MediCare Pro</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
            <Award className="h-4 w-4 text-white mr-2" />
            <span className="text-white text-sm font-medium">Trusted by 500+ Healthcare Providers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Medicare pro appointment &
            <span className="block text-white">Management System</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your clinic operations with our comprehensive management system. 
            Handle appointments, patients, billing, and more in one unified platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <Zap className="h-5 w-5 mr-2" />
              Start Free Trial
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
              Watch Demo
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Active Clinics" },
              { number: "50K+", label: "Patients Managed" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Run Your Clinic
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Powerful features designed by healthcare professionals for healthcare professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Intelligent appointment booking with conflict detection and automated reminders",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: Users,
                title: "Patient Management",
                description: "Complete patient profiles with medical history, prescriptions, and treatment plans",
                color: "from-blue-500 to-blue-700"
              },
              {
                icon: FileText,
                title: "Digital Billing",
                description: "Automated invoicing, insurance claims, and financial reporting in Bangladeshi Taka",
                color: "from-blue-300 to-blue-500"
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard",
                description: "Real-time insights on clinic performance, revenue trends, and patient satisfaction",
                color: "from-white to-blue-100"
              },
              {
                icon: Shield,
                title: "Secure & Compliant",
                description: "HIPAA-compliant data security with role-based access control",
                color: "from-blue-600 to-blue-800"
              },
              {
                icon: Heart,
                title: "Doctor Portal",
                description: "Dedicated interface for doctors to manage schedules, patients, and medical records",
                color: "from-blue-200 to-blue-400"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-blue-100">See what our customers are saying</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Ahmed",
                role: "Clinic Director",
                image: "👩‍⚕️",
                quote: "MediCare Pro has transformed how we manage our clinic. Patient satisfaction has increased by 40% since we started using it.",
                rating: 5
              },
              {
                name: "Dr. Mohammad Rahman",
                role: "General Physician",
                image: "👨‍⚕️",
                quote: "The scheduling system is incredible. No more double bookings and our patients love the automated reminders.",
                rating: 5
              },
              {
                name: "Fatima Khan",
                role: "Practice Manager",
                image: "👩‍💼",
                quote: "The billing module has saved us hours of work every week. Everything is automated and error-free.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-white fill-current" />
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-blue-200 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-white/10 to-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Clinic?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals who trust MediCare Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <CheckCircle className="h-5 w-5 mr-2" />
              Start Free Trial
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-8 w-8 text-white" />
                <span className="text-white text-2xl font-bold">MediCare Pro</span>
              </div>
              <p className="text-blue-200 mb-6 leading-relaxed">
                Empowering healthcare providers with modern, efficient clinic management solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-white text-lg">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-white text-lg">t</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-white text-lg">in</span>
                </div>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold mb-6">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Security', 'Integrations', 'API'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Press', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-white font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center text-blue-200">
                  <Mail className="h-4 w-4 mr-3 text-white" />
                  support@medicarepro.com
                </div>
                <div className="flex items-center text-blue-200">
                  <Phone className="h-4 w-4 mr-3 text-white" />
                  +8801883844096
                </div>
                <div className="flex items-center text-blue-200">
                  <MapPin className="h-4 w-4 mr-3 text-white" />
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              &copy; 2025 MediCare Pro. All rights reserved. Built for medicare pro appointment management.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
