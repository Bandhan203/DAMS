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
import MedicineForm from './MedicineForm';

// Enhanced inventory data with more details
const inventoryData = [
  {
    id: 1,
    name: 'Amoxicillin 500mg capsule',
    units: 150,
    stockStatus: 'In Stock',
    price: 15.00,
    category: 'Antibiotic',
    batch: 'MET004',
    status: 'Expired',
    statusType: 'danger',
    supplier: 'PharmaCorp Ltd',
    expiryDate: '2024-12-15',
    restockDate: '2025-01-10',
    minStock: 50,
    restockDetails: {
      lastRestocked: '2024-11-15',
      restockQuantity: 150,
      restockCost: 2250.00,
      nextRestockDue: '2025-02-10',
      supplierContact: '+880 1712-345678',
      supplierEmail: 'contact@medicarepro.com',
      averageMonthlyUsage: 45,
      restockHistory: [
        { date: '2024-11-15', quantity: 150, cost: 2250.00, supplier: 'PharmaCorp Ltd' },
        { date: '2024-09-10', quantity: 120, cost: 1800.00, supplier: 'PharmaCorp Ltd' },
        { date: '2024-07-05', quantity: 100, cost: 1500.00, supplier: 'PharmaCorp Ltd' }
      ]
    }
  },
  {
    id: 2,
    name: 'Lisinopril 10mg tablet',
    units: 200,
    stockStatus: 'Low Stock',
    price: 15.00,
    category: 'ACE Inhibitor',
    batch: 'LIS004',
    status: 'Expires in 25 days',
    statusType: 'warning',
    supplier: 'MediSupply Co',
    expiryDate: '2025-09-15',
    restockDate: '2025-08-25',
    minStock: 100,
    restockDetails: {
      lastRestocked: '2024-12-20',
      restockQuantity: 200,
      restockCost: 3000.00,
      nextRestockDue: '2025-09-25',
      supplierContact: '+880 1712-987654',
      supplierEmail: 'orders@medicarepro.com',
      averageMonthlyUsage: 60,
      restockHistory: [
        { date: '2024-12-20', quantity: 200, cost: 3000.00, supplier: 'MediSupply Co' },
        { date: '2024-10-15', quantity: 180, cost: 2700.00, supplier: 'MediSupply Co' },
        { date: '2024-08-10', quantity: 150, cost: 2250.00, supplier: 'MediSupply Co' }
      ]
    }
  },
  {
    id: 3,
    name: 'Ibuprofen 50mg',
    units: 20,
    stockStatus: 'In Stock',
    price: 10.50,
    category: 'NSAID',
    batch: 'IBU004',
    status: 'Expired December 25, 2025',
    statusType: 'danger',
    supplier: 'HealthCare Solutions',
    expiryDate: '2025-12-25',
    restockDate: '2025-11-01',
    minStock: 30,
    restockDetails: {
      lastRestocked: '2025-01-15',
      restockQuantity: 250,
      restockCost: 2625.00,
      nextRestockDue: '2025-12-01',
      supplierContact: '+880 1712-555123',
      supplierEmail: 'supply@healthcare-solutions.com',
      averageMonthlyUsage: 25,
      restockHistory: [
        { date: '2025-01-15', quantity: 250, cost: 2625.00, supplier: 'HealthCare Solutions' },
        { date: '2024-11-10', quantity: 200, cost: 2100.00, supplier: 'HealthCare Solutions' },
        { date: '2024-09-05', quantity: 180, cost: 1890.00, supplier: 'HealthCare Solutions' }
      ]
    }
  },
  {
    id: 4,
    name: 'Metformin 500mg capsule',
    units: 80,
    stockStatus: 'In Stock',
    price: 25.00,
    category: 'Antidiabetic',
    batch: 'MET004',
    status: 'Expired',
    statusType: 'danger',
    supplier: 'GlobalPharma Inc',
    expiryDate: '2024-06-30',
    restockDate: '2025-07-15',
    minStock: 40,
    restockDetails: {
      lastRestocked: '2024-12-01',
      restockQuantity: 120,
      restockCost: 3000.00,
      nextRestockDue: '2025-08-15',
      supplierContact: '+880 1712-777888',
      supplierEmail: 'orders@globalpharma.com',
      averageMonthlyUsage: 35,
      restockHistory: [
        { date: '2024-12-01', quantity: 120, cost: 3000.00, supplier: 'GlobalPharma Inc' },
        { date: '2024-09-20', quantity: 100, cost: 2500.00, supplier: 'GlobalPharma Inc' },
        { date: '2024-07-15', quantity: 90, cost: 2250.00, supplier: 'GlobalPharma Inc' }
      ]
    }
  }
];

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [medicines, setMedicines] = useState(inventoryData);
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
    navigate('/inventory/details', { state: { medicine } });
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
    a.download = 'inventory_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate inventory statistics
  const totalItems = medicines.length;
  const lowStockItems = medicines.filter(item => item.stockStatus === 'Low Stock').length;
  const expiredItems = medicines.filter(item => item.statusType === 'danger').length;
  const totalValue = medicines.reduce((sum, item) => sum + (item.units * item.price), 0);

  const inventoryStats = [
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
              Inventory Management
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

      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat, index) => (
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
                <option>Antibiotic</option>
                <option>ACE Inhibitor</option>
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
                    : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    medicine.statusType === 'danger' ? 'text-red-600' : 'text-yellow-600'
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
            </h3>
            <MedicineForm
              medicine={editingMedicine}
              onSave={handleSaveMedicine}
              onCancel={() => {
                setShowMedicineForm(false);
                setEditingMedicine(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Restock Details Modal */}
      {showRestockDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Restock Details</h3>
              <button
                onClick={() => setShowRestockDetails(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Medicine Header */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{showRestockDetails.name}</h4>
                    <p className="text-blue-600 font-semibold text-lg mb-2">{showRestockDetails.category}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-gray-100 px-3 py-1 rounded-lg">
                        <strong>Batch:</strong> {showRestockDetails.batch}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-lg">
                        <strong>Current Stock:</strong> {showRestockDetails.units} units
                      </span>
                      <span className={`px-3 py-1 rounded-lg font-medium ${
                        showRestockDetails.stockStatus === 'In Stock' ? 'bg-green-100 text-green-700' : 
                        showRestockDetails.stockStatus === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {showRestockDetails.stockStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-700 mb-1">৳{showRestockDetails.price}</div>
                    <div className="text-sm text-gray-600">Per Unit</div>
                  </div>
                </div>
              </div>

              {/* Current Stock Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4">Stock Information</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Current Units:</span>
                      <p className="text-gray-900 text-xl font-bold">{showRestockDetails.units}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Minimum Stock:</span>
                      <p className="text-red-600 font-medium">{showRestockDetails.minStock} units</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Expiry Date:</span>
                      <p className="text-gray-900">{new Date(showRestockDetails.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4">Supplier Details</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Supplier:</span>
                      <p className="text-gray-900">{showRestockDetails.supplier}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Contact:</span>
                      <p className="text-gray-900">{showRestockDetails.restockDetails.supplierContact}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Email:</span>
                      <p className="text-gray-900">{showRestockDetails.restockDetails.supplierEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4">Restock Schedule</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Last Restocked:</span>
                      <p className="text-gray-900">{new Date(showRestockDetails.restockDetails.lastRestocked).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Next Restock Due:</span>
                      <p className="text-green-600 font-medium">{new Date(showRestockDetails.restockDetails.nextRestockDue).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Monthly Usage:</span>
                      <p className="text-gray-900">{showRestockDetails.restockDetails.averageMonthlyUsage} units/month</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Restock Info */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">Latest Restock Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">{showRestockDetails.restockDetails.restockQuantity}</div>
                    <div className="text-sm text-gray-600">Units Restocked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">৳{showRestockDetails.restockDetails.restockCost.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">৳{(showRestockDetails.restockDetails.restockCost / showRestockDetails.restockDetails.restockQuantity).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Cost Per Unit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">{new Date(showRestockDetails.restockDetails.lastRestocked).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-600">Restock Date</div>
                  </div>
                </div>
              </div>

              {/* Restock History */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-4">Restock History</h5>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Cost</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Unit Cost</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Supplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showRestockDetails.restockDetails.restockHistory.map((restock, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{new Date(restock.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{restock.quantity} units</td>
                          <td className="py-3 px-4">৳{restock.cost.toFixed(2)}</td>
                          <td className="py-3 px-4">৳{(restock.cost / restock.quantity).toFixed(2)}</td>
                          <td className="py-3 px-4">{restock.supplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRestockDetails(null);
                    // Open restock order form
                    console.log('Opening restock order form');
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300"
                >
                  <Truck className="w-4 h-4" />
                  Place Restock Order
                </button>
                <button
                  onClick={() => {
                    setShowRestockDetails(null);
                    handleEditMedicine(showRestockDetails);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  Edit Medicine
                </button>
                <button
                  onClick={() => {
                    // Export restock report
                    const reportData = `Restock Report - ${showRestockDetails.name}\n` +
                      `Current Stock: ${showRestockDetails.units} units\n` +
                      `Last Restocked: ${showRestockDetails.restockDetails.lastRestocked}\n` +
                      `Next Restock Due: ${showRestockDetails.restockDetails.nextRestockDue}\n` +
                      `Supplier: ${showRestockDetails.supplier}`;
                    
                    const blob = new Blob([reportData], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `restock-report-${showRestockDetails.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Delete Medicine</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{medicineToDelete?.name}</strong>?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMedicineToDelete(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
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

export default InventoryManagement;
