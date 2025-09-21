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
  Download
} from 'lucide-react';

// Enhanced pharmacy data with more details (matching inventory structure exactly)
const pharmacyData = [
  {
    id: 1,
    name: 'Paracetamol 500mg tablet',
    units: 150,
    stockStatus: 'In Stock',
    price: 5.50,
    category: 'Analgesic',
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
    name: 'Amoxicillin 250mg capsule',
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
    category: 'NSAID',
    batch: 'IBU003',
    status: 'Expired June 30, 2024',
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
    name: 'Metformin 500mg tablet',
    units: 80,
    stockStatus: 'In Stock',
    price: 15.25,
    category: 'Antidiabetic',
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
  const [medicines, setMedicines] = useState(pharmacyData);
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

  // Calculate pharmacy statistics (matching inventory structure exactly)
  const totalItems = medicines.length;
  const lowStockItems = medicines.filter(item => item.stockStatus === 'Low Stock').length;
  const expiredItems = medicines.filter(item => item.statusType === 'danger').length;
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
      label: 'Expired',
      value: expiredItems,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-lg p-6 border border-white/20 shadow-xl">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pharmacy Management
            </h1>
            <p className="text-gray-600 mt-2">Manage medicine inventory and stock levels</p>
          </div>
        </div>
        <button 
          onClick={handleAddMedicine}
          className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Plus className="w-5 h-5" strokeWidth="2.5" />
          <span>Add New Medicine</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>

      {/* Pharmacy Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pharmacyStats.map((stat, index) => (
          <div key={stat.label} 
               className="group relative overflow-hidden"
               style={{ animationDelay: `${index * 100}ms` }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}/20 rounded-2xl blur`}></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Categories</option>
                <option>Analgesic</option>
                <option>Antibiotic</option>
                <option>NSAID</option>
                <option>Antidiabetic</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
                <option>Expired</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            {/* Medicine Count */}
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {filteredMedicines.length} medicines
            </span>
          </div>
        </div>
      </div>

      {/* Medicine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMedicines.map((medicine, idx) => (
          <div key={medicine.id} className="group relative overflow-hidden" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditMedicine(medicine);
                  }}
                  className="p-2 bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700 transition-colors rounded-xl shadow-lg"
                >
                  <Edit className="w-5 h-5" strokeWidth="2.5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewMedicine(medicine);
                  }}
                  className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors rounded-xl shadow-lg"
                >
                  <Eye className="w-5 h-5" strokeWidth="2.5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMedicine(medicine);
                  }}
                  className="p-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-colors rounded-xl shadow-lg"
                >
                  <Trash2 className="w-5 h-5" strokeWidth="2.5" />
                </button>
              </div>

              {/* Medicine Info */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{medicine.name}</h3>
                    <p className="text-sm text-gray-600">Batch: {medicine.batch}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600 uppercase tracking-wide">Stock</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{medicine.units}</p>
                  <p className="text-xs text-gray-600">Units available</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600 uppercase tracking-wide">Value</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">৳{(medicine.units * medicine.price).toFixed(2)}</p>
                  <p className="text-xs text-gray-600">Total worth</p>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Stock Status:
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                    medicine.stockStatus === 'Low Stock' 
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                      : medicine.stockStatus === 'Out of Stock'
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-green-100 text-green-800 border-green-200'
                  }`}>
                    {medicine.stockStatus}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Unit Price:
                  </span>
                  <span className="text-sm font-bold text-gray-900">৳{medicine.price.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Category:
                  </span>
                  <span className="text-sm text-blue-600 font-bold">{medicine.category}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Supplier:
                  </span>
                  <span className="text-sm font-bold text-gray-900">{medicine.supplier}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Expiry:
                  </span>
                  <span className="text-sm font-bold text-gray-900">{medicine.expiryDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Min Stock:
                  </span>
                  <span className="text-sm font-bold text-gray-900">{medicine.minStock} units</span>
                </div>
              </div>

              {/* Status with Warning */}
              <div className="mb-6">
                <div className={`flex items-center gap-3 p-4 rounded-xl border font-bold shadow-lg ${
                  medicine.statusType === 'danger' 
                    ? 'bg-red-50 border-red-200 text-red-800' 
                    : medicine.statusType === 'warning'
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                    : 'bg-green-50 border-green-200 text-green-800'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    medicine.statusType === 'danger' ? 'text-red-600' 
                    : medicine.statusType === 'warning' ? 'text-yellow-600'
                    : 'text-green-600'
                  }`} />
                  <span>
                    {medicine.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons at Bottom */}
              <div className="flex gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestock(medicine);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Truck className="w-4 h-4" />
                  Restock
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewMedicine(medicine);
                  }}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <BarChart3 className="w-4 h-4" />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Medicine Form Modal */}
      {showMedicineForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
            </h3>
            <MedicineForm
              medicine={editingMedicine}
              onSave={handleSaveMedicine}
              onCancel={() => setShowMedicineForm(false)}
            />
          </div>
        </div>
      )}

      {/* Restock Details Modal */}
      {showRestockDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Restock Details</h3>
              <button
                onClick={() => setShowRestockDetails(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <RestockDetails
              medicine={showRestockDetails}
              onClose={() => setShowRestockDetails(null)}
              onRestock={(quantity, cost) => {
                // Update medicine stock
                setMedicines(medicines.map(m => 
                  m.id === showRestockDetails.id 
                    ? { 
                        ...m, 
                        units: m.units + quantity,
                        stockStatus: (m.units + quantity) > m.minStock ? 'In Stock' : 'Low Stock',
                        statusType: (m.units + quantity) > m.minStock ? 'success' : 'warning',
                        status: (m.units + quantity) > m.minStock ? 'In Stock' : `Low stock alert: Only ${m.units + quantity} units remaining`
                      }
                    : m
                ));
                setShowRestockDetails(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {medicineToDelete?.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// MedicineForm Component
const MedicineForm = ({ medicine, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: medicine?.name || '',
    category: medicine?.category || 'Analgesic',
    units: medicine?.units || 0,
    price: medicine?.price || 0,
    batch: medicine?.batch || '',
    supplier: medicine?.supplier || '',
    expiryDate: medicine?.expiryDate || '',
    minStock: medicine?.minStock || 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Analgesic</option>
            <option>Antibiotic</option>
            <option>NSAID</option>
            <option>Antidiabetic</option>
            <option>Cardiovascular</option>
            <option>Respiratory</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
          <input
            type="number"
            value={formData.units}
            onChange={(e) => handleChange('units', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (৳)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
          <input
            type="text"
            value={formData.batch}
            onChange={(e) => handleChange('batch', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
          <input
            type="text"
            value={formData.supplier}
            onChange={(e) => handleChange('supplier', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stock</label>
          <input
            type="number"
            value={formData.minStock}
            onChange={(e) => handleChange('minStock', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {medicine ? 'Update Medicine' : 'Add Medicine'}
        </button>
      </div>
    </form>
  );
};

// RestockDetails Component
const RestockDetails = ({ medicine, onClose, onRestock }) => {
  const [restockQuantity, setRestockQuantity] = useState(50);
  const [restockCost, setRestockCost] = useState(0);

  const handleRestock = () => {
    onRestock(restockQuantity, restockCost);
  };

  return (
    <div className="space-y-6">
      {/* Medicine Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{medicine.name}</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Current Stock:</span>
            <span className="ml-2 font-bold">{medicine.units} units</span>
          </div>
          <div>
            <span className="text-gray-600">Minimum Stock:</span>
            <span className="ml-2 font-bold">{medicine.minStock} units</span>
          </div>
          <div>
            <span className="text-gray-600">Supplier:</span>
            <span className="ml-2 font-bold">{medicine.supplier}</span>
          </div>
          <div>
            <span className="text-gray-600">Unit Price:</span>
            <span className="ml-2 font-bold">৳{medicine.price}</span>
          </div>
        </div>
      </div>

      {/* Restock Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Restock Quantity</label>
          <input
            type="number"
            value={restockQuantity}
            onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Cost (৳)</label>
          <input
            type="number"
            step="0.01"
            value={restockCost}
            onChange={(e) => setRestockCost(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
          />
        </div>
      </div>

      {/* Calculations */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h5 className="font-bold text-gray-900 mb-2">Restock Summary</h5>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>New Stock Level:</span>
            <span className="font-bold">{medicine.units + restockQuantity} units</span>
          </div>
          <div className="flex justify-between">
            <span>Cost per Unit:</span>
            <span className="font-bold">৳{restockQuantity > 0 ? (restockCost / restockQuantity).toFixed(2) : '0.00'}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Investment:</span>
            <span className="font-bold text-blue-600">৳{restockCost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Restock History */}
      {medicine.restockDetails?.restockHistory && (
        <div>
          <h5 className="font-bold text-gray-900 mb-3">Recent Restock History</h5>
          <div className="space-y-2">
            {medicine.restockDetails.restockHistory.slice(0, 3).map((entry, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div>
                  <span className="text-sm font-medium">{entry.date}</span>
                  <span className="text-xs text-gray-600 ml-2">{entry.supplier}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{entry.quantity} units</div>
                  <div className="text-xs text-gray-600">৳{entry.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleRestock}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Confirm Restock
        </button>
      </div>
    </div>
  );
};

export default PharmacyManagement;
