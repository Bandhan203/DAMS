import React, { useState } from 'react';
import {
  Search,
  Calendar,
  CreditCard,
  User,
  FileText,
  Download,
  Eye,
  Edit,
  Filter,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Grid,
  List,
  Plus
} from 'lucide-react';

const recentInvoices = [
  {
    id: 'INV-001',
    patientName: 'panna akter',
    patientId: 'P001',
    date: '2025-08-18',
    dueDate: '2025-09-17',
    amount: 1250.00,
    status: 'Paid',
    paymentMethod: 'Credit Card',
    services: ['Consultation', 'Lab Tests'],
    doctor: 'Dr. Ahmad Rahman',
    paidDate: '2025-08-20'
  },
  {
    id: 'INV-002',
    patientName: 'lamiya khan',
    patientId: 'P002',
    date: '2025-08-17',
    dueDate: '2025-09-16',
    amount: 850.00,
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    services: ['Surgery Consultation'],
    doctor: 'Dr. Fatima Ali',
    paidDate: null
  },
  {
    id: 'INV-003',
    patientName: 'Emma Davis',
    patientId: 'P003',
    date: '2025-08-16',
    dueDate: '2025-09-15',
    amount: 2100.00,
    status: 'Overdue',
    paymentMethod: 'Cash',
    services: ['Physical Therapy', 'X-Ray'],
    doctor: 'Dr. Hassan Khan',
    paidDate: null
  },
  {
    id: 'INV-004',
    patientName: 'David Wilson',
    patientId: 'P004',
    date: '2025-08-15',
    dueDate: '2025-09-14',
    amount: 575.00,
    status: 'Paid',
    paymentMethod: 'Insurance',
    services: ['Routine Checkup'],
    doctor: 'Dr. Sadia Afrin',
    paidDate: '2025-08-16'
  },
  {
    id: 'INV-005',
    patientName: 'Lisa Brown',
    patientId: 'P005',
    date: '2025-08-14',
    dueDate: '2025-09-13',
    amount: 1800.00,
    status: 'Partial',
    paymentMethod: 'Credit Card',
    services: ['Dental Treatment', 'Cleaning'],
    doctor: 'Dr. Rahman',
    paidDate: null
  }
];

const BillingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Calculate statistics
  const totalInvoices = recentInvoices.length;
  const paidInvoices = recentInvoices.filter(inv => inv.status === 'Paid').length;
  const pendingInvoices = recentInvoices.filter(inv => inv.status === 'Pending').length;
  const overdueInvoices = recentInvoices.filter(inv => inv.status === 'Overdue').length;
  const totalRevenue = recentInvoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = recentInvoices
    .filter(inv => inv.status !== 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const billingStats = [
    {
      label: 'Total Invoices',
      value: totalInvoices,
      icon: FileText,
      color: 'bg-blue-50 text-blue-600',
      gradient: 'from-blue-500 to-cyan-500',
      trend: '+12%',
      trendColor: 'text-green-600'
    },
    {
      label: 'Total Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
      gradient: 'from-green-500 to-emerald-500',
      trend: '+8.5%',
      trendColor: 'text-green-600'
    },
    {
      label: 'Pending Revenue',
      value: `৳${pendingRevenue.toLocaleString()}`,
      icon: Clock,
      color: 'bg-orange-50 text-orange-600',
      gradient: 'from-orange-500 to-red-500',
      trend: '-3.2%',
      trendColor: 'text-red-600'
    },
    {
      label: 'Collection Rate',
      value: `${Math.round((paidInvoices / totalInvoices) * 100)}%`,
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600',
      gradient: 'from-purple-500 to-pink-500',
      trend: '+2.1%',
      trendColor: 'text-green-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Partial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'Partial':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-lg p-6 border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Invoice Management
                </h1>
                <p className="text-gray-600 mt-2">Manage and track all patient invoices</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Bulk Actions */}
          {selectedInvoices.length > 0 && (
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg px-4 py-2">
              <span className="text-sm font-medium text-gray-700">{selectedInvoices.length} selected</span>
              <button className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors rounded-lg">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 bg-green-100 text-green-600 hover:bg-green-200 transition-colors rounded-lg">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {/* View Mode Toggle */}
          <div className="flex bg-white/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          {/* Create Invoice Button */}
          <button className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Invoice</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {billingStats.map((stat, index) => (
          <div key={stat.label} 
               className="group relative overflow-hidden transform hover:scale-105 transition-all duration-500"
               style={{ animationDelay: `${index * 150}ms` }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}/20 rounded-2xl blur transition-all duration-300 group-hover:blur-sm`}></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mt-2">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className={`w-3 h-3 ${stat.trendColor}`} />
                      <span className={`text-xs font-medium ${stat.trendColor}`}>{stat.trend}</span>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-20 animate-pulse`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl group-focus-within:bg-white/90"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
            </div>
            
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Partial">Partial</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="patient">Sort by Patient</option>
                <option value="status">Sort by Status</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {recentInvoices.map((invoice, idx) => (
          <div key={invoice.id} 
               className="group relative overflow-hidden"
               style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur"></div>
            <div className={`relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer ${
              viewMode === 'list' ? 'p-6 flex items-center justify-between' : 'p-6'
            }`}>
              {viewMode === 'grid' ? (
                <>
                  {/* Invoice Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">{invoice.patientName}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </div>

                  {/* Invoice Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date:
                      </span>
                      <span className="text-sm font-bold text-gray-900">{invoice.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Amount:
                      </span>
                      <span className="text-sm font-bold text-gray-900">৳{invoice.amount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Doctor:
                      </span>
                      <span className="text-sm font-bold text-gray-900">{invoice.doctor}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Payment:
                      </span>
                      <span className="text-sm font-bold text-gray-900">{invoice.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {invoice.services.map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg font-medium">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{invoice.id}</h3>
                      <p className="text-sm text-gray-600">{invoice.patientName} • {invoice.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">৳{invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{invoice.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors rounded-xl">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors rounded-xl">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700 transition-colors rounded-xl">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingList;
