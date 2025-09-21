import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Mail,
  Edit,
  Calendar,
  User,
  Building,
  Phone,
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Copy,
  Share2,
  ArrowLeft,
  Receipt,
  Calculator,
  Eye
} from 'lucide-react';
import Modal from '../common/Modal';

const InvoiceDetails = ({ invoiceId = 'INV-001', onClose, onEdit }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Animation on mount
  React.useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Mock invoice data
  const invoice = {
    id: 'INV-001',
    number: 'INV-2025-001',
    status: 'Paid',
    issueDate: '2025-08-18',
    dueDate: '2025-09-17',
    paidDate: '2025-08-20',
    patient: {
      id: 'P001',
      name: 'Panna Khan',
      email: 'panna.khan@email.com',
      phone: '+8801712345678',
      address: 'House 123, Road 15, Dhanmondi, Dhaka-1205, Bangladesh'
    },
    doctor: {
      id: 'D001',
      name: 'Dr. Ahmad Rahman',
      specialty: 'Cardiology',
      license: 'BM-12345'
    },
    clinic: {
      name: 'Medicare pro Medical Center',
      address: 'Plot 456, Gulshan Avenue, Gulshan-2, Dhaka-1212, Bangladesh',
      phone: '+8802-9876543',
      email: 'info@medicarepro.com',
      website: 'www.medicarepro.com'
    },
    items: [
      {
        service: 'Consultation',
        description: 'Cardiology consultation and examination',
        quantity: 1,
        rate: 1000.00,
        amount: 1000.00
      },
      {
        service: 'ECG Test',
        description: 'Electrocardiogram test and analysis',
        quantity: 1,
        rate: 500.00,
        amount: 500.00
      },
      {
        service: 'Lab Tests',
        description: 'Blood tests - Complete Blood Count',
        quantity: 1,
        rate: 800.00,
        amount: 800.00
      }
    ],
    subtotal: 2300.00,
    tax: 115.00, // 5%
    discount: 165.00, // 7%
    total: 2250.00,
    paymentMethod: 'Credit Card',
    paymentTerms: '30 days',
    notes: 'Follow-up appointment recommended in 2 weeks. Please take prescribed medications as directed.'
  };

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
        return <CheckCircle className="w-5 h-5" />;
      case 'Pending':
        return <Clock className="w-5 h-5" />;
      case 'Overdue':
        return <AlertCircle className="w-5 h-5" />;
      case 'Partial':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const handlePrint = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.print();
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  const handleDownload = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Downloading invoice PDF...');
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Sending invoice via email...');
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://healthcareplus.com/invoices/${invoice.id}`);
    // You could show a toast notification here
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 transition-all duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in-right">
          <CheckCircle className="w-5 h-5" />
          <span>Action completed successfully!</span>
        </div>
      )}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Processing...</span>
          </div>
        </div>
      )}
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Invoices</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              disabled={isLoading}
              className="group p-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Print Invoice"
            >
              <Printer className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
            </button>
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="group p-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download PDF"
            >
              <Download className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
            </button>
            <button
              onClick={handleEmail}
              disabled={isLoading}
              className="group p-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Email Invoice"
            >
              <Mail className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-300" />
            </button>
            <button
              onClick={handleCopyLink}
              className="group p-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              title="Copy Link"
            >
              <Copy className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
            </button>
            <button
              onClick={onEdit}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Edit Invoice
            </button>
          </div>
        </div>

        {/* Invoice Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 print:shadow-none print:border-gray-300">
            
            {/* Invoice Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                    <Receipt className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      INVOICE
                    </h1>
                    <p className="text-gray-600">{invoice.number}</p>
                  </div>
                </div>
                
                {/* Clinic Information */}
                <div className="space-y-1 text-sm">
                  <h3 className="font-bold text-gray-900 text-lg">{invoice.clinic.name}</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {invoice.clinic.address}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {invoice.clinic.phone}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {invoice.clinic.email}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-lg ${getStatusColor(invoice.status)} mb-4`}>
                  {getStatusIcon(invoice.status)}
                  {invoice.status}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Issue Date:</span>
                    <span className="font-bold text-gray-900">{invoice.issueDate}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-bold text-gray-900">{invoice.dueDate}</span>
                  </div>
                  {invoice.paidDate && (
                    <div className="flex items-center justify-end gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">Paid Date:</span>
                      <span className="font-bold text-green-700">{invoice.paidDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bill To & Doctor Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Patient Information */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"></div>
                <div className="relative p-6 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Bill To
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-bold text-gray-900 text-lg">{invoice.patient.name}</p>
                    <p className="text-gray-600">Patient ID: {invoice.patient.id}</p>
                    <p className="text-gray-600 flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {invoice.patient.address}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {invoice.patient.phone}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {invoice.patient.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor Information */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl"></div>
                <div className="relative p-6 rounded-xl border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-green-600" />
                    Attending Doctor
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-bold text-gray-900 text-lg">{invoice.doctor.name}</p>
                    <p className="text-gray-600">Doctor ID: {invoice.doctor.id}</p>
                    <p className="text-gray-600">Specialty: {invoice.doctor.specialty}</p>
                    <p className="text-gray-600">License: {invoice.doctor.license}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Services Provided
              </h3>
              
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="text-left p-4 font-bold text-gray-900 border-b border-gray-200">Service</th>
                      <th className="text-left p-4 font-bold text-gray-900 border-b border-gray-200">Description</th>
                      <th className="text-center p-4 font-bold text-gray-900 border-b border-gray-200">Qty</th>
                      <th className="text-right p-4 font-bold text-gray-900 border-b border-gray-200">Rate (৳)</th>
                      <th className="text-right p-4 font-bold text-gray-900 border-b border-gray-200">Amount (৳)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 font-medium text-gray-900 border-b border-gray-100">{item.service}</td>
                        <td className="p-4 text-gray-600 border-b border-gray-100">{item.description}</td>
                        <td className="p-4 text-center text-gray-900 border-b border-gray-100">{item.quantity}</td>
                        <td className="p-4 text-right text-gray-900 border-b border-gray-100">৳{item.rate.toLocaleString()}</td>
                        <td className="p-4 text-right font-bold text-gray-900 border-b border-gray-100">৳{item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-full max-w-md">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl"></div>
                  <div className="relative p-6 rounded-xl border border-green-200">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-bold text-gray-900">৳{invoice.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax (5%):</span>
                        <span className="font-bold text-gray-900">৳{invoice.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Discount (7%):</span>
                        <span className="font-bold text-red-600">-৳{invoice.discount.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-green-300 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">Total:</span>
                          <span className="text-2xl font-bold text-green-700 flex items-center gap-1">
                            <DollarSign className="w-6 h-6" />
                            ৳{invoice.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"></div>
                <div className="relative p-6 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    Payment Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Payment Method:</span> <span className="font-bold text-gray-900">{invoice.paymentMethod}</span></p>
                    <p><span className="text-gray-600">Payment Terms:</span> <span className="font-bold text-gray-900">{invoice.paymentTerms}</span></p>
                    {invoice.status === 'Paid' && (
                      <p className="flex items-center gap-2 text-green-700 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Payment completed on {invoice.paidDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl"></div>
                  <div className="relative p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gray-600" />
                      Notes
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{invoice.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-500">
                Thank you for choosing {invoice.clinic.name}. We appreciate your trust in our services.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                This is a computer-generated invoice. For any queries, please contact us at {invoice.clinic.email}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions (Non-printable) */}
        <div className="print:hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-xl border border-green-200 transition-all duration-300 hover:scale-105"
                >
                  <CreditCard className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-green-800">Record Payment</p>
                </button>
                
                <button
                  onClick={handleEmail}
                  className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 rounded-xl border border-blue-200 transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-blue-800">Send to Patient</p>
                </button>
                
                <button
                  onClick={() => navigator.share?.({ url: window.location.href, title: `Invoice ${invoice.number}` })}
                  className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-xl border border-purple-200 transition-all duration-300 hover:scale-105"
                >
                  <Share2 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-purple-800">Share Invoice</p>
                </button>
                
                <button
                  onClick={() => window.open(`/invoices/${invoice.id}/duplicate`)}
                  className="p-4 bg-gradient-to-br from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 rounded-xl border border-orange-200 transition-all duration-300 hover:scale-105"
                >
                  <Copy className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-medium text-orange-800">Duplicate Invoice</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        title="Record Payment"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter payment amount"
              defaultValue={invoice.amount}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="cash">Cash</option>
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="insurance">Insurance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Payment notes..."
            ></textarea>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
              }}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Record Payment
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InvoiceDetails;
