import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  Package,
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  Truck,
  BarChart3,
  Eye,
  Filter,
  Download,
  Pill,
  User,
  Stethoscope,
  FileText,
  CheckCircle
} from 'lucide-react';

// Enhanced medicines data with more details
const medicinesData = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    units: 150,
    stockStatus: 'In Stock',
    price: 5.50,
    category: 'Pain Relief',
    batch: 'PAR001',
    status: 'In Stock',
    statusType: 'success',
    supplier: 'PharmaCorp Ltd',
    expiryDate: '2025-12-31',
    restockDate: '2025-11-01',
    minStock: 50,
    restockDetails: {
      lastRestocked: '2024-01-15',
      restockQuantity: 150,
      restockCost: 825.00,
      nextRestockDue: '2025-02-15',
      supplierContact: '+880 1712-345678',
      supplierEmail: 'contact@pharmacorp.com',
      averageMonthlyUsage: 45,
      restockHistory: [
        { date: '2024-01-15', quantity: 150, cost: 825.00, supplier: 'PharmaCorp Ltd' },
        { date: '2023-11-10', quantity: 120, cost: 660.00, supplier: 'PharmaCorp Ltd' },
        { date: '2023-09-05', quantity: 100, cost: 550.00, supplier: 'PharmaCorp Ltd' }
      ]
    }
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    units: 25,
    stockStatus: 'Low Stock',
    price: 12.00,
    category: 'Antibiotic',
    batch: 'AMX002',
    status: 'Low Stock Alert',
    statusType: 'warning',
    supplier: 'MediSupply Co',
    expiryDate: '2025-08-15',
    restockDate: '2025-07-20',
    minStock: 30,
    restockDetails: {
      lastRestocked: '2024-02-20',
      restockQuantity: 100,
      restockCost: 1200.00,
      nextRestockDue: '2025-03-20',
      supplierContact: '+880 1712-987654',
      supplierEmail: 'orders@medisupply.com',
      averageMonthlyUsage: 20,
      restockHistory: [
        { date: '2024-02-20', quantity: 100, cost: 1200.00, supplier: 'MediSupply Co' },
        { date: '2023-12-15', quantity: 80, cost: 960.00, supplier: 'MediSupply Co' },
        { date: '2023-10-10', quantity: 75, cost: 900.00, supplier: 'MediSupply Co' }
      ]
    }
  },
  {
    id: 3,
    name: 'Ibuprofen 400mg',
    units: 0,
    stockStatus: 'Out of Stock',
    price: 8.75,
    category: 'Pain Relief',
    batch: 'IBU003',
    status: 'Out of Stock',
    statusType: 'danger',
    supplier: 'HealthCare Solutions',
    expiryDate: '2024-06-30',
    restockDate: '2025-06-01',
    minStock: 40,
    restockDetails: {
      lastRestocked: '2023-12-10',
      restockQuantity: 0,
      restockCost: 0,
      nextRestockDue: 'Urgent',
      supplierContact: '+880 1712-555123',
      supplierEmail: 'supply@healthcare-solutions.com',
      averageMonthlyUsage: 35,
      restockHistory: [
        { date: '2023-12-10', quantity: 200, cost: 1750.00, supplier: 'HealthCare Solutions' },
        { date: '2023-09-05', quantity: 180, cost: 1575.00, supplier: 'HealthCare Solutions' },
        { date: '2023-07-01', quantity: 160, cost: 1400.00, supplier: 'HealthCare Solutions' }
      ]
    }
  },
  {
    id: 4,
    name: 'Metformin 500mg',
    units: 80,
    stockStatus: 'In Stock',
    price: 15.25,
    category: 'Diabetes',
    batch: 'MET004',
    status: 'In Stock',
    statusType: 'success',
    supplier: 'GlobalPharma Inc',
    expiryDate: '2025-10-20',
    restockDate: '2025-09-15',
    minStock: 25,
    restockDetails: {
      lastRestocked: '2024-03-05',
      restockQuantity: 120,
      restockCost: 1830.00,
      nextRestockDue: '2025-04-05',
      supplierContact: '+880 1712-777888',
      supplierEmail: 'orders@globalpharma.com',
      averageMonthlyUsage: 30,
      restockHistory: [
        { date: '2024-03-05', quantity: 120, cost: 1830.00, supplier: 'GlobalPharma Inc' },
        { date: '2023-12-20', quantity: 100, cost: 1525.00, supplier: 'GlobalPharma Inc' },
        { date: '2023-10-15', quantity: 90, cost: 1372.50, supplier: 'GlobalPharma Inc' }
      ]
    }
  }
];

const PharmacyManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [medicines, setMedicines] = useState(medicinesData);
  const [showRestockDetails, setShowRestockDetails] = useState(null);

  // Filter medicines based on search and filters
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All Categories' || medicine.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'All Status' || medicine.stockStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle adding new medicine
  const handleAddMedicine = () => {
    setEditingMedicine(null);
    setShowMedicineForm(true);
  };

  // Handle editing medicine
  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setShowMedicineForm(true);
  };

  // Handle viewing medicine details
  const handleViewMedicine = (medicine) => {
    navigate('/pharmacy/details', { state: { medicine } });
  };

  // Handle delete medicine
  const handleDeleteMedicine = (medicine) => {
    setMedicineToDelete(medicine);
    setShowDeleteConfirm(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setMedicines(medicines.filter(m => m.id !== medicineToDelete.id));
    setShowDeleteConfirm(false);
    setMedicineToDelete(null);
  };

  // Handle restock
  const handleRestock = (medicine) => {
    setShowRestockDetails(medicine);
  };

  // Handle save medicine (add or edit)
  const handleSaveMedicine = (medicineData) => {
    if (editingMedicine) {
      // Update existing medicine
      setMedicines(medicines.map(m => 
        m.id === editingMedicine.id 
          ? { ...editingMedicine, ...medicineData }
          : m
      ));
    } else {
      // Add new medicine
      const newMedicine = {
        ...medicineData,
        id: Math.max(...medicines.map(m => m.id)) + 1,
        stockStatus: medicineData.units > medicineData.minStock ? 'In Stock' : 'Low Stock',
        statusType: medicineData.units <= medicineData.minStock ? 'warning' : 'success',
        status: medicineData.units <= medicineData.minStock ? 
          `Low stock alert: Only ${medicineData.units} units remaining` : 
          'In stock'
      };
      setMedicines([...medicines, newMedicine]);
    }
    setShowMedicineForm(false);
    setEditingMedicine(null);
  };

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['Name', 'Category', 'Units', 'Price', 'Batch', 'Supplier', 'Expiry Date', 'Status'],
      ...filteredMedicines.map(medicine => [
        medicine.name,
        medicine.category,
        medicine.units,
        medicine.price,
        medicine.batch,
        medicine.supplier,
        medicine.expiryDate,
        medicine.stockStatus
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pharmacy_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate pharmacy statistics
  const totalItems = medicines.length;
  const lowStockItems = medicines.filter(item => item.stockStatus === 'Low Stock').length;
  const outOfStockItems = medicines.filter(item => item.stockStatus === 'Out of Stock').length;
  const totalValue = medicines.reduce((sum, item) => sum + (item.units * item.price), 0);

  const pharmacyStats = [
    {
      label: 'Total Items',
      value: totalItems,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Low Stock',
      value: lowStockItems,
      icon: TrendingDown,
      color: 'bg-orange-50 text-orange-600',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      label: 'Out of Stock',
      value: outOfStockItems,
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      label: 'Total Value',
      value: `৳${totalValue.toFixed(2)}`,
      icon: BarChart3,
      color: 'bg-green-50 text-green-600',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    stock: '',
    minStock: '',
    price: '',
    manufacturer: '',
    batchNo: '',
    expiryDate: ''
  });

  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    doctorName: '',
    medicines: [{ name: '', quantity: '', dosage: '' }]
  });

  const handleAddMedicine = () => {
    const medicine = {
      id: medicines.length + 1,
      ...newMedicine,
      stock: parseInt(newMedicine.stock),
      minStock: parseInt(newMedicine.minStock),
      price: parseFloat(newMedicine.price),
      status: parseInt(newMedicine.stock) > parseInt(newMedicine.minStock) ? 'In Stock' : 'Low Stock'
    };
    setMedicines([...medicines, medicine]);
    setNewMedicine({
      name: '',
      category: '',
      stock: '',
      minStock: '',
      price: '',
      manufacturer: '',
      batchNo: '',
      expiryDate: ''
    });
    setShowMedicineModal(false);
  };

  const handleAddPrescription = () => {
    const prescription = {
      id: prescriptions.length + 1,
      prescriptionNo: `RX2024${String(prescriptions.length + 3).padStart(3, '0')}`,
      ...newPrescription,
      status: 'Pending',
      totalAmount: Math.random() * 500 + 50,
      date: new Date().toISOString().split('T')[0]
    };
    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      patientName: '',
      doctorName: '',
      medicines: [{ name: '', quantity: '', dosage: '' }]
    });
    setShowPrescriptionModal(false);
  };

  const addMedicineField = () => {
    setNewPrescription({
      ...newPrescription,
      medicines: [...newPrescription.medicines, { name: '', quantity: '', dosage: '' }]
    });
  };

  const updateMedicineField = (index, field, value) => {
    const updatedMedicines = newPrescription.medicines.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setNewPrescription({ ...newPrescription, medicines: updatedMedicines });
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.prescriptionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen p-6">
      {/* Header with enhanced styling */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-1 opacity-10"></div>
        <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Pharmacy Management
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Manage medicines and prescriptions with ease</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => setShowMedicineModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-6 py-3 rounded-xl border-0"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Medicine
              </Button>
              <Button
                onClick={() => setShowPrescriptionModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-6 py-3 rounded-xl border-0"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Prescription
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs with modern styling */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
        <nav className="flex space-x-2">
          <button
            onClick={() => setActiveTab('medicines')}
            className={`flex-1 py-4 px-6 border-0 font-bold text-sm rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'medicines'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Medicines</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`flex-1 py-4 px-6 border-0 font-bold text-sm rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'prescriptions'
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Prescriptions</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Search with enhanced styling */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 p-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="pl-12 pr-6 py-4 w-full border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent text-gray-700 placeholder-gray-400 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'medicines' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.id} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25"></div>
              <Card className="relative bg-white border-0 rounded-2xl p-6 shadow-xl">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                          <Pill className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">{medicine.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{medicine.category}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 shadow-sm ${
                        medicine.status === 'In Stock' 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-300 shadow-green-200' 
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-300 shadow-yellow-200'
                      }`}>
                        {medicine.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Medicine Details with modern styling */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Stock
                    </span>
                    <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                      medicine.stock > medicine.minStock 
                        ? 'text-green-700 bg-green-100' 
                        : 'text-orange-700 bg-orange-100'
                    }`}>
                      {medicine.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Price
                    </span>
                    <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                      ${medicine.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Batch
                    </span>
                    <span className="text-sm font-bold text-gray-700">{medicine.batchNo}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Expiry
                    </span>
                    <span className="text-sm font-bold text-gray-700">{medicine.expiryDate}</span>
                  </div>
                </div>

                {/* Manufacturer info */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Manufacturer</p>
                  <p className="text-sm font-bold text-gray-700">{medicine.manufacturer}</p>
                </div>

                {/* Action buttons with modern styling */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg font-semibold"
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                      <span>Edit</span>
                    </div>
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 shadow-lg font-semibold"
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                      </svg>
                      <span>Restock</span>
                    </div>
                  </Button>
                </div>

                {/* Progress bar for stock level */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Stock Level</span>
                    <span>{Math.round((medicine.stock / (medicine.minStock * 2)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        medicine.stock > medicine.minStock 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                      }`}
                      style={{ width: `${Math.min((medicine.stock / (medicine.minStock * 2)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPrescriptions.map((prescription) => (
            <div key={prescription.id} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-20"></div>
              <Card className="relative bg-white border-0 rounded-2xl p-6 shadow-xl">
                {/* Header with gradient and modern styling */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{prescription.prescriptionNo}</h3>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                          PRESCRIPTION
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-gray-800 flex items-center">
                          <User className="w-4 h-4 mr-2 text-blue-500" />
                          {prescription.patientName}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Stethoscope className="w-4 h-4 mr-2 text-green-500" />
                          {prescription.doctorName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 text-sm font-bold rounded-xl shadow-lg ${
                      prescription.status === 'Dispensed' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    }`}>
                      {prescription.status}
                    </span>
                    <div className="mt-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">${prescription.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Medicines Section with enhanced styling */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                    Prescribed Medicines
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prescription.medicines.map((med, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100 shadow-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
                              <Pill className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900 text-lg">{med.name}</p>
                              <p className="text-sm text-blue-700 font-medium mt-1">{med.dosage}</p>
                            </div>
                          </div>
                          <span className="bg-white text-blue-700 font-bold text-sm px-3 py-1 rounded-lg shadow-md border border-blue-200">
                            Qty: {med.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with date and actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Date: {prescription.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    {prescription.status === 'Pending' && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg px-6"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Dispense
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg px-6"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                      </svg>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Add Medicine Modal */}
      <Modal
        isOpen={showMedicineModal}
        onClose={() => setShowMedicineModal(false)}
        title="Add New Medicine"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.category}
                onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Analgesic">Analgesic</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Antidiabetic">Antidiabetic</option>
                <option value="ACE Inhibitor">ACE Inhibitor</option>
                <option value="Vitamin">Vitamin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.stock}
                onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Stock
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.minStock}
                onChange={(e) => setNewMedicine({ ...newMedicine, minStock: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.price}
                onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.manufacturer}
                onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.batchNo}
                onChange={(e) => setNewMedicine({ ...newMedicine, batchNo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMedicine.expiryDate}
                onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowMedicineModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMedicine}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Medicine
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Prescription Modal */}
      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        title="New Prescription"
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
                value={newPrescription.patientName}
                onChange={(e) => setNewPrescription({ ...newPrescription, patientName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPrescription.doctorName}
                onChange={(e) => setNewPrescription({ ...newPrescription, doctorName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicines
            </label>
            {newPrescription.medicines.map((medicine, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Medicine name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={medicine.name}
                  onChange={(e) => updateMedicineField(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={medicine.quantity}
                  onChange={(e) => updateMedicineField(index, 'quantity', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Dosage instructions"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={medicine.dosage}
                  onChange={(e) => updateMedicineField(index, 'dosage', e.target.value)}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMedicineField}
              className="mt-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Medicine
            </Button>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowPrescriptionModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddPrescription}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Create Prescription
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PharmacyManagement;
