import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  BarChart3,
  CreditCard,
  Clock,
  CheckCircle,
  Eye,
  Download,
  Plus,
  User,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  Banknote,
  Filter,
  Grid,
  List,
  Settings,
  AlertCircle,
  AlertTriangle,
  Star,
  Zap,
  Activity,
  Target,
  Award,
  Edit,
  Send,
  Printer,
  Trash2
} from 'lucide-react';
import InvoiceForm from './InvoiceForm';
import InvoiceDetails from './InvoiceDetails';

const revenueMetrics = [
  {
    label: 'Total Revenue',
    value: '৳12,55,000',
    icon: BarChart3,
    color: 'bg-blue-50 text-blue-700',
    gradient: 'from-blue-500 to-cyan-500',
    trend: '+12.5%',
    trendIcon: TrendingUp,
    trendColor: 'text-green-600',
    description: 'vs last month'
  },
  {
    label: 'Paid Revenue',
    value: '৳9,83,000',
    icon: CheckCircle,
    color: 'bg-green-50 text-green-700',
    gradient: 'from-green-500 to-emerald-500',
    trend: '+8.3%',
    trendIcon: TrendingUp,
    trendColor: 'text-green-600',
    description: 'collection rate: 78%'
  },
  {
    label: 'Pending Revenue',
    value: '৳2,72,000',
    icon: Clock,
    color: 'bg-orange-50 text-orange-700',
    gradient: 'from-orange-500 to-red-500',
    trend: '-3.1%',
    trendIcon: TrendingDown,
    trendColor: 'text-red-600',
    description: '22% of total'
  },
  {
    label: 'Active Patients',
    value: '1,247',
    icon: User,
    color: 'bg-purple-50 text-purple-700',
    gradient: 'from-purple-500 to-pink-500',
    trend: '+5.2%',
    trendIcon: TrendingUp,
    trendColor: 'text-green-600',
    description: 'this month'
  }
];

const invoicesData = [
  {
    id: 1,
    invoiceNumber: 'INV-2025-001',
    patient: 'Panna Khan',
    patientId: 'P001',
    date: 'Jul 18, 2025',
    dueDate: 'Aug 17, 2025',
    amount: 30250,
    paymentMethod: 'Credit Card',
    status: 'Paid',
    statusColor: 'green',
    paidDate: 'Jul 20, 2025',
    items: 2,
    doctor: 'Dr. Rahman',
    priority: 'high',
    services: ['Consultation', 'Lab Tests'],
    description: 'Regular checkup with blood work'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2025-002',
    patient: 'Lamiya Khan',
    patientId: 'P002',
    date: 'Jul 19, 2025',
    dueDate: 'Aug 18, 2025',
    amount: 12250,
    paymentMethod: 'Bank Transfer',
    status: 'Pending',
    statusColor: 'orange',
    paidDate: null,
    items: 1,
    doctor: 'Dr. Fatima',
    priority: 'medium',
    services: ['Surgery Consultation'],
    description: 'Pre-operative consultation'
  },
  {
    id: 3,
    invoiceNumber: 'INV-2025-003',
    patient: 'Rina Begaume',
    patientId: 'P003',
    date: 'Jul 17, 2025',
    dueDate: 'Aug 16, 2025',
    amount: 18750,
    paymentMethod: 'Insurance',
    status: 'Overdue',
    statusColor: 'red',
    paidDate: null,
    items: 3,
    doctor: 'Dr. Hassan Khan',
    priority: 'high',
    services: ['X-Ray', 'Physical Therapy', 'Consultation'],
    description: 'Comprehensive treatment package'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2025-004',
    patient: 'Dulal',
    patientId: 'P004',
    date: 'Jul 20, 2025',
    dueDate: 'Aug 19, 2025',
    amount: 8500,
    paymentMethod: 'Cash',
    status: 'Paid',
    statusColor: 'green',
    paidDate: 'Jul 20, 2025',
    items: 1,
    doctor: 'Dr. Sadia Afrin',
    priority: 'low',
    services: ['Routine Checkup'],
    description: 'Annual health screening'
  }
];

const BillingManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [animateIn, setAnimateIn] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState(invoicesData);

  // Calculate revenue statistics dynamically
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidRevenue = invoices
    .filter(invoice => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingRevenue = invoices
    .filter(invoice => invoice.status === 'Pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueRevenue = invoices
    .filter(invoice => invoice.status === 'Overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  // Dynamic revenue metrics
  const dynamicRevenueMetrics = [
    {
      label: 'Total Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-700',
      gradient: 'from-blue-500 to-cyan-500',
      trend: '+12.5%',
      trendIcon: TrendingUp,
      trendColor: 'text-green-600',
      description: 'vs last month'
    },
    {
      label: 'Paid Revenue',
      value: `৳${paidRevenue.toLocaleString()}`,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-700',
      gradient: 'from-green-500 to-emerald-500',
      trend: '+8.2%',
      trendIcon: TrendingUp,
      trendColor: 'text-green-600',
      description: 'vs last month'
    },
    {
      label: 'Pending Revenue',
      value: `৳${pendingRevenue.toLocaleString()}`,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-700',
      gradient: 'from-yellow-500 to-orange-500',
      trend: '+15.3%',
      trendIcon: TrendingUp,
      trendColor: 'text-green-600',
      description: 'vs last month'
    },
    {
      label: 'Overdue Revenue',
      value: `৳${overdueRevenue.toLocaleString()}`,
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-700',
      gradient: 'from-red-500 to-pink-500',
      trend: '-5.1%',
      trendIcon: TrendingDown,
      trendColor: 'text-red-600',
      description: 'vs last month'
    }
  ];

  // Filter invoices based on search and filters
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || invoice.status === statusFilter;
    const matchesPayment = paymentFilter === 'All Payment Methods' || invoice.paymentMethod === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Handle creating new invoice
  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setShowInvoiceForm(true);
  };

  // Handle editing invoice
  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setShowInvoiceForm(true);
  };

  // Handle viewing invoice details
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };

  // Handle downloading invoice
  const handleDownloadInvoice = (invoice) => {
    // Create a simple invoice text format
    const invoiceText = `
INVOICE: ${invoice.invoiceNumber}
Date: ${invoice.date}
Due Date: ${invoice.dueDate}

Patient: ${invoice.patient} (${invoice.patientId})
Doctor: ${invoice.doctor}

Services:
${invoice.services.map(service => `- ${service}`).join('\n')}

Amount: ৳${invoice.amount.toLocaleString()}
Payment Method: ${invoice.paymentMethod}
Status: ${invoice.status}

Description: ${invoice.description}
    `;

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoiceNumber}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle printing invoice
  const handlePrintInvoice = (invoice) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Invoice ${invoice.invoiceNumber}</title></head>
        <body>
          <h1>Invoice ${invoice.invoiceNumber}</h1>
          <p><strong>Date:</strong> ${invoice.date}</p>
          <p><strong>Patient:</strong> ${invoice.patient}</p>
          <p><strong>Doctor:</strong> ${invoice.doctor}</p>
          <p><strong>Amount:</strong> ৳${invoice.amount.toLocaleString()}</p>
          <p><strong>Status:</strong> ${invoice.status}</p>
          <h3>Services:</h3>
          <ul>${invoice.services.map(service => `<li>${service}</li>`).join('')}</ul>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Handle sending invoice
  const handleSendInvoice = (invoice) => {
    // Simulate sending invoice via email
    alert(`Invoice ${invoice.invoiceNumber} sent to patient ${invoice.patient}`);
  };

  // Handle saving invoice (add or edit)
  const handleSaveInvoice = (invoiceData) => {
    if (editingInvoice) {
      // Update existing invoice
      setInvoices(invoices.map(inv => 
        inv.id === editingInvoice.id 
          ? { ...editingInvoice, ...invoiceData }
          : inv
      ));
    } else {
      // Add new invoice
      const newInvoice = {
        ...invoiceData,
        id: Math.max(...invoices.map(inv => inv.id)) + 1,
        invoiceNumber: `INV-2025-${String(Math.max(...invoices.map(inv => inv.id)) + 1).padStart(3, '0')}`,
        date: new Date().toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
        items: invoiceData.services?.length || 1,
        priority: 'medium'
      };
      setInvoices([...invoices, newInvoice]);
    }
    setShowInvoiceForm(false);
    setEditingInvoice(null);
  };

  // Handle export all invoices
  const handleExportInvoices = () => {
    const csvContent = [
      ['Invoice Number', 'Patient', 'Doctor', 'Date', 'Amount', 'Status', 'Payment Method'],
      ...filteredInvoices.map(invoice => [
        invoice.invoiceNumber,
        invoice.patient,
        invoice.doctor,
        invoice.date,
        invoice.amount,
        invoice.status,
        invoice.paymentMethod
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'billing_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedInvoices.length === 0) {
      alert('Please select invoices first');
      return;
    }

    switch (action) {
      case 'export':
        const selectedData = invoices.filter(invoice => 
          selectedInvoices.includes(invoice.id)
        );
        const csvContent = [
          ['Invoice Number', 'Patient', 'Doctor', 'Date', 'Amount', 'Status', 'Payment Method'],
          ...selectedData.map(invoice => [
            invoice.invoiceNumber,
            invoice.patient,
            invoice.doctor,
            invoice.date,
            invoice.amount,
            invoice.status,
            invoice.paymentMethod
          ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'selected_invoices.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        break;
      
      case 'markPaid':
        setInvoices(invoices.map(invoice => 
          selectedInvoices.includes(invoice.id) 
            ? { ...invoice, status: 'Paid', paidDate: new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              }) }
            : invoice
        ));
        break;
      
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedInvoices.length} invoices?`)) {
          setInvoices(invoices.filter(invoice => !selectedInvoices.includes(invoice.id)));
        }
        break;
      
      default:
        break;
    }
    
    setSelectedInvoices([]);
  };

  // Handle invoice selection
  const handleInvoiceSelect = (invoiceId) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId)
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.id));
    }
  };

  // Quick action handlers
  const handleQuickAction = (action) => {
    switch (action) {
      case 'export':
        handleExportInvoices();
        break;
      case 'reports':
        navigate('/billing/reports');
        break;
      case 'settings':
        navigate('/billing/settings');
        break;
      case 'analytics':
        navigate('/billing/analytics');
        break;
      default:
        break;
    }
    setShowQuickActions(false);
  };

  // Handle metric card clicks
  const handleMetricClick = (metricLabel) => {
    switch (metricLabel) {
      case 'Total Revenue':
        navigate('/billing/revenue-report');
        break;
      case 'Paid Revenue':
        setStatusFilter('Paid');
        break;
      case 'Pending Revenue':
        setStatusFilter('Pending');
        break;
      case 'Overdue Revenue':
        setStatusFilter('Overdue');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setAnimateIn(true);
    
    // Add keyboard shortcuts
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            handleCreateInvoice();
            break;
          case 'e':
            e.preventDefault();
            handleExportInvoices();
            break;
          case 'f':
            e.preventDefault();
            document.querySelector('input[placeholder="Search invoices..."]')?.focus();
            break;
          default:
            break;
        }
      }
      
      // ESC to close modals
      if (e.key === 'Escape') {
        if (showInvoiceForm) {
          setShowInvoiceForm(false);
          setEditingInvoice(null);
        }
        if (showInvoiceDetails) {
          setShowInvoiceDetails(false);
          setSelectedInvoice(null);
        }
        if (showQuickActions) {
          setShowQuickActions(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showInvoiceForm, showInvoiceDetails, showQuickActions]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Paid':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          dotColor: 'bg-green-500'
        };
      case 'Pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          dotColor: 'bg-yellow-500'
        };
      case 'Overdue':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertCircle,
          dotColor: 'bg-red-500'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: FileText,
          dotColor: 'bg-gray-500'
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 space-y-8 transition-all duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-lg p-6 border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Billing Management
                </h1>
                <p className="text-gray-600 mt-1">Manage invoices and revenue tracking</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Quick Actions Button */}
          <button 
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="relative group p-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
          >
            <Settings className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:rotate-90 transition-all duration-300" />
          </button>
          
          {/* View Mode Toggle */}
          <div className="flex bg-white/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
              title="Grid View"
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
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={handleCreateInvoice}
            className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            title="Create New Invoice (Ctrl+N)"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Create Invoice</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicRevenueMetrics.map((metric, index) => (
          <div key={metric.label} 
               className="group relative overflow-hidden transform hover:scale-105 transition-all duration-500"
               style={{ animationDelay: `${index * 150}ms` }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient}/20 rounded-2xl blur transition-all duration-300 group-hover:blur-sm`}></div>
            <div 
              onClick={() => handleMetricClick(metric.label)}
              className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl ${metric.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <metric.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <metric.trendIcon className={`w-4 h-4 ${metric.trendColor}`} />
                      <span className={`text-sm font-bold ${metric.trendColor}`}>{metric.trend}</span>
                    </div>
                    <span className="text-xs text-gray-500">{metric.description}</span>
                  </div>
                </div>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full transition-all duration-1000 group-hover:w-full`} 
                     style={{ width: '70%' }}>
                </div>
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${metric.gradient} opacity-20 animate-pulse`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Panel */}
      {showQuickActions && (
        <div className="relative animate-bounce-in">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => handleQuickAction('export')}
                className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 rounded-xl border border-blue-200 transition-all duration-300 hover:scale-105 group"
              >
                <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-medium text-blue-800 text-sm">Revenue Report</p>
              </button>
              <button 
                onClick={() => handleQuickAction('reports')}
                className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-xl border border-green-200 transition-all duration-300 hover:scale-105 group"
              >
                <Target className="w-6 h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-medium text-green-800 text-sm">Payment Goals</p>
              </button>
              <button 
                onClick={() => handleQuickAction('analytics')}
                className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-xl border border-purple-200 transition-all duration-300 hover:scale-105 group"
              >
                <Award className="w-6 h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-medium text-purple-800 text-sm">Top Patients</p>
              </button>
              <button 
                onClick={() => handleQuickAction('settings')}
                className="p-4 bg-gradient-to-br from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 rounded-xl border border-orange-200 transition-all duration-300 hover:scale-105 group"
              >
                <Star className="w-6 h-6 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-medium text-orange-800 text-sm">Analytics</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Row */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-1">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search invoices... (Ctrl+F)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl group-focus-within:bg-white/90"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>

              {/* Status Dropdown */}
              <div className="relative group">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
                >
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-blue-500 transition-colors duration-300" />
              </div>

              {/* Payment Methods Dropdown */}
              <div className="relative group">
                <select 
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="appearance-none bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
                >
                  <option>All Payment Methods</option>
                  <option>Credit Card</option>
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Insurance</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-purple-500 transition-colors duration-300" />
              </div>
            </div>

            {/* Invoice Count & Actions */}
            <div className="flex items-center gap-4">
              {selectedInvoices.length > 0 && (
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                  <span className="text-sm font-medium text-blue-700">
                    {selectedInvoices.length} selected
                  </span>
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                    title="Export Selected"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleBulkAction('markPaid')}
                    className="p-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                    title="Mark as Paid"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                    title="Delete Selected"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-600">Select All</span>
              </label>
              
              <span className="text-sm font-medium text-gray-600 bg-white/50 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/20">
                {filteredInvoices.length} invoices
              </span>
              <button 
                onClick={handleExportInvoices}
                className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl border border-gray-300 transition-all duration-300 hover:scale-105 group"
                title="Export All (Ctrl+E)"
              >
                <Filter className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredInvoices.map((invoice, idx) => {
          const statusConfig = getStatusConfig(invoice.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={invoice.id} 
                 className="group relative overflow-hidden transform hover:scale-105 transition-all duration-500"
                 style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur transition-all duration-300 group-hover:blur-sm"></div>
              <div 
                onClick={() => handleViewInvoice(invoice)}
                className={`relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  viewMode === 'list' ? 'p-6 flex items-center justify-between' : 'p-6'
                }`}
              >
                
                {viewMode === 'grid' ? (
                  <>
                    {/* Invoice Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleInvoiceSelect(invoice.id);
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </label>
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{invoice.invoiceNumber}</h3>
                          <p className="text-sm text-gray-600">{invoice.patient}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`}></div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${statusConfig.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {invoice.status}
                        </span>
                      </div>
                    </div>

                    {/* Priority Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Target className={`w-4 h-4 ${getPriorityColor(invoice.priority)}`} />
                        <span className={`text-xs font-medium ${getPriorityColor(invoice.priority)} capitalize`}>
                          {invoice.priority} Priority
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">ID: {invoice.patientId}</span>
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
                          <Banknote className="w-4 h-4" />
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

                      {invoice.paidDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Paid:
                          </span>
                          <span className="text-sm font-bold text-green-700">{invoice.paidDate}</span>
                        </div>
                      )}
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
                      <p className="text-xs text-gray-500 mt-2">{invoice.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewInvoice(invoice);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl group"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        View
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadInvoice(invoice);
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl group"
                      >
                        <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        Download
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendInvoice(invoice);
                        }}
                        className="p-2 bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700 transition-all duration-300 rounded-xl group"
                      >
                        <Send className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="flex items-center gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleInvoiceSelect(invoice.id);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </label>
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-bold text-gray-900">{invoice.invoiceNumber}</h3>
                          <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`}></div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${statusConfig.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {invoice.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{invoice.patient} • {invoice.doctor} • {invoice.date}</p>
                        <p className="text-xs text-gray-500">{invoice.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-lg">৳{invoice.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{invoice.paymentMethod}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewInvoice(invoice);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors rounded-xl group"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadInvoice(invoice);
                          }}
                          className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors rounded-xl group"
                        >
                          <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditInvoice(invoice);
                          }}
                          className="p-2 bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700 transition-colors rounded-xl group"
                        >
                          <Edit className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrintInvoice(invoice);
                          }}
                          className="p-2 bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700 transition-colors rounded-xl group"
                        >
                          <Printer className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoice Form Modal */}
      {showInvoiceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <InvoiceForm
              invoice={editingInvoice}
              onSave={handleSaveInvoice}
              onClose={() => {
                setShowInvoiceForm(false);
                setEditingInvoice(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {showInvoiceDetails && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <InvoiceDetails
              invoice={selectedInvoice}
              onClose={() => {
                setShowInvoiceDetails(false);
                setSelectedInvoice(null);
              }}
              onEdit={() => {
                setShowInvoiceDetails(false);
                handleEditInvoice(selectedInvoice);
              }}
              onDownload={() => handleDownloadInvoice(selectedInvoice)}
              onPrint={() => handlePrintInvoice(selectedInvoice)}
              onSend={() => handleSendInvoice(selectedInvoice)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingManagement;
