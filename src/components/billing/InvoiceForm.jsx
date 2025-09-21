import React, { useState } from 'react';
import {
  User,
  Calendar,
  DollarSign,
  FileText,
  Plus,
  Trash2,
  Save,
  X,
  Search,
  Building,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Calculator,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const InvoiceForm = ({ onClose, invoice = null }) => {
  const [formData, setFormData] = useState({
    patientId: invoice?.patientId || '',
    patientName: invoice?.patientName || '',
    patientEmail: invoice?.patientEmail || '',
    patientPhone: invoice?.patientPhone || '',
    patientAddress: invoice?.patientAddress || '',
    doctorId: invoice?.doctorId || '',
    doctorName: invoice?.doctorName || '',
    invoiceDate: invoice?.invoiceDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || '',
    items: invoice?.items || [
      { service: '', description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    subtotal: invoice?.subtotal || 0,
    tax: invoice?.tax || 0,
    discount: invoice?.discount || 0,
    total: invoice?.total || 0,
    notes: invoice?.notes || '',
    paymentTerms: invoice?.paymentTerms || '30 days'
  });

  const [errors, setErrors] = useState({});
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [showDoctorSearch, setShowDoctorSearch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [animateIn, setAnimateIn] = useState(false);

  // Animation on mount
  React.useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Mock data for search
  const patients = [
    { id: 'P001', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+8801712345678', address: 'Dhaka, Bangladesh' },
    { id: 'P002', name: 'Michael Chen', email: 'michael@email.com', phone: '+8801987654321', address: 'Chittagong, Bangladesh' },
    { id: 'P003', name: 'Emma Davis', email: 'emma@email.com', phone: '+8801555666777', address: 'Sylhet, Bangladesh' }
  ];

  const doctors = [
    { id: 'D001', name: 'Dr. Ahmad Rahman', specialty: 'Cardiology' },
    { id: 'D002', name: 'Dr. Fatima Ali', specialty: 'Surgery' },
    { id: 'D003', name: 'Dr. Hassan Khan', specialty: 'Pediatrics' }
  ];

  const services = [
    'Consultation',
    'Surgery',
    'Lab Tests',
    'X-Ray',
    'MRI Scan',
    'CT Scan',
    'Physical Therapy',
    'Dental Treatment',
    'Eye Examination',
    'Vaccination'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    // Calculate amount for this item
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }

    setFormData(prev => ({
      ...prev,
      items: newItems
    }));

    calculateTotals(newItems);
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { service: '', description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
    calculateTotals(newItems);
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (formData.tax / 100);
    const discountAmount = subtotal * (formData.discount / 100);
    const total = subtotal + taxAmount - discountAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      total
    }));
  };

  const selectPatient = (patient) => {
    setFormData(prev => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name,
      patientEmail: patient.email,
      patientPhone: patient.phone,
      patientAddress: patient.address
    }));
    setShowPatientSearch(false);
  };

  const selectDoctor = (doctor) => {
    setFormData(prev => ({
      ...prev,
      doctorId: doctor.id,
      doctorName: doctor.name
    }));
    setShowDoctorSearch(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientName) newErrors.patientName = 'Patient name is required';
    if (!formData.doctorName) newErrors.doctorName = 'Doctor is required';
    if (!formData.invoiceDate) newErrors.invoiceDate = 'Invoice date is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (formData.items.some(item => !item.service)) newErrors.items = 'All items must have a service';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        onClose?.();
      }, 2000);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all duration-500 ${animateIn ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        {/* Header */}
        <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {invoice ? 'Edit Invoice' : 'Create New Invoice'}
                </h2>
                <p className="text-gray-600 mt-1">Fill in the details to generate an invoice</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs text-gray-600">Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs text-gray-600">Items</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs text-gray-600">Review</span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Patient & Doctor Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Patient Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Patient Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Patient Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.patientName}
                          onChange={(e) => handleInputChange('patientName', e.target.value)}
                          onFocus={() => setShowPatientSearch(true)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 ${errors.patientName ? 'border-red-300' : 'border-white/20'}`}
                          placeholder="Search or enter patient name"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.patientName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.patientName}
                        </p>
                      )}
                      
                      {/* Patient Search Dropdown */}
                      {showPatientSearch && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-white/20 shadow-xl z-10 max-h-48 overflow-y-auto">
                          {patients.map(patient => (
                            <div
                              key={patient.id}
                              onClick={() => selectPatient(patient)}
                              className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <p className="font-medium text-gray-900">{patient.name}</p>
                              <p className="text-sm text-gray-600">{patient.id} • {patient.email}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            value={formData.patientEmail}
                            onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            placeholder="patient@email.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            value={formData.patientPhone}
                            onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            placeholder="+880171234567"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          value={formData.patientAddress}
                          onChange={(e) => handleInputChange('patientAddress', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                          rows="2"
                          placeholder="Patient address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl blur"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-green-600" />
                    Doctor & Invoice Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doctor *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.doctorName}
                          onChange={(e) => handleInputChange('doctorName', e.target.value)}
                          onFocus={() => setShowDoctorSearch(true)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 ${errors.doctorName ? 'border-red-300' : 'border-white/20'}`}
                          placeholder="Search or select doctor"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.doctorName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.doctorName}
                        </p>
                      )}
                      
                      {/* Doctor Search Dropdown */}
                      {showDoctorSearch && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-white/20 shadow-xl z-10 max-h-48 overflow-y-auto">
                          {doctors.map(doctor => (
                            <div
                              key={doctor.id}
                              onClick={() => selectDoctor(doctor)}
                              className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <p className="font-medium text-gray-900">{doctor.name}</p>
                              <p className="text-sm text-gray-600">{doctor.id} • {doctor.specialty}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Invoice Date *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="date"
                            value={formData.invoiceDate}
                            onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 ${errors.invoiceDate ? 'border-red-300' : 'border-white/20'}`}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Due Date *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => handleInputChange('dueDate', e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 ${errors.dueDate ? 'border-red-300' : 'border-white/20'}`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Terms
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          value={formData.paymentTerms}
                          onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                        >
                          <option value="15 days">15 days</option>
                          <option value="30 days">30 days</option>
                          <option value="45 days">45 days</option>
                          <option value="60 days">60 days</option>
                          <option value="Due on receipt">Due on receipt</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services/Items */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Services & Items
                  </h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
                
                {errors.items && (
                  <p className="text-red-500 text-sm mb-4 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.items}
                  </p>
                )}
                
                <div className="space-y-4">
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white/50 rounded-xl border border-white/20">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service
                        </label>
                        <select
                          value={item.service}
                          onChange={(e) => handleItemChange(index, 'service', e.target.value)}
                          className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                        >
                          <option value="">Select Service</option>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                          placeholder="Item description"
                        />
                      </div>
                      
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Qty
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rate (৳)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                        />
                      </div>
                      
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                          ৳{item.amount.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="md:col-span-1 flex items-end">
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-2xl blur"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  Invoice Totals
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.tax}
                      onChange={(e) => {
                        handleInputChange('tax', Number(e.target.value));
                        calculateTotals(formData.items);
                      }}
                      className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.discount}
                      onChange={(e) => {
                        handleInputChange('discount', Number(e.target.value));
                        calculateTotals(formData.items);
                      }}
                      className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-end">
                    <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-4 border border-green-200">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>৳{formData.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax ({formData.tax}%):</span>
                          <span>৳{(formData.subtotal * (formData.tax / 100)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Discount ({formData.discount}%):</span>
                          <span>-৳{(formData.subtotal * (formData.discount / 100)).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-green-300 pt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-green-700">৳{formData.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-slate-400/20 rounded-2xl blur"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Additional Notes
                </h3>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 transition-all duration-300 resize-none"
                  rows="4"
                  placeholder="Any additional notes or terms for this invoice..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-white/20">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium flex items-center gap-2"
                  disabled={currentStep === 1}
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                  Previous
                </button>
                
                <div className="text-sm text-gray-500">
                  Step {currentStep} of 3
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium hover:scale-105"
                >
                  Cancel
                </button>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Next
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {invoice ? 'Update Invoice' : 'Create Invoice'}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Click outside to close dropdowns */}
      {(showPatientSearch || showDoctorSearch) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setShowPatientSearch(false);
            setShowDoctorSearch(false);
          }}
        />
      )}
    </div>
  );
};

export default InvoiceForm;
