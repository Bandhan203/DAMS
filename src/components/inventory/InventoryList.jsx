import React, { useState } from 'react';
import {
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Eye,
  Edit,
  BarChart3,
  ChevronDown,
  Grid,
  List
} from 'lucide-react';

const quickStatsData = [
  {
    name: 'Paracetamol 500mg',
    units: 500,
    status: 'In Stock',
    category: 'Analgesic',
    value: '৳2,500'
  },
  {
    name: 'Amoxicillin 250mg',
    units: 75,
    status: 'Low Stock',
    category: 'Antibiotic',
    value: '৳1,125'
  },
  {
    name: 'Insulin Glargine',
    units: 25,
    status: 'Critical',
    category: 'Antidiabetic',
    value: '৳12,500'
  },
  {
    name: 'Aspirin 100mg',
    units: 300,
    status: 'In Stock',
    category: 'Antiplatelet',
    value: '৳900'
  },
  {
    name: 'Atorvastatin 20mg',
    units: 150,
    status: 'In Stock',
    category: 'Statin',
    value: '৳4,500'
  }
];

const InventoryList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const totalItems = quickStatsData.length;
  const lowStockItems = quickStatsData.filter(item => item.status === 'Low Stock' || item.status === 'Critical').length;
  const totalValue = quickStatsData.reduce((sum, item) => {
    const value = parseFloat(item.value.replace('৳', '').replace(',', ''));
    return sum + value;
  }, 0);

  const quickStats = [
    {
      label: 'Total Medicines',
      value: totalItems,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Need Attention',
      value: lowStockItems,
      icon: AlertTriangle,
      color: 'bg-orange-50 text-orange-600',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      label: 'Total Value',
      value: `৳${totalValue.toLocaleString()}`,
      icon: TrendingUp,
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
              Inventory Overview
            </h1>
            <p className="text-gray-600 mt-2">Quick view of medicine stock levels</p>
          </div>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex bg-white/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
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

      {/* Search and Filters */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
              />
            </div>
            
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
              >
                <option value="name">Sort by Name</option>
                <option value="stock">Sort by Stock</option>
                <option value="category">Sort by Category</option>
                <option value="value">Sort by Value</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Medicine List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {quickStatsData.map((medicine, idx) => (
          <div key={medicine.name} 
               className="group relative overflow-hidden"
               style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur"></div>
            <div className={`relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer ${
              viewMode === 'list' ? 'p-6 flex items-center justify-between' : 'p-6'
            }`}>
              {viewMode === 'grid' ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">{medicine.category}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className="font-bold text-gray-900">{medicine.units} units</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Value:</span>
                      <span className="font-bold text-gray-900">{medicine.value}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        medicine.status === 'Critical' 
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : medicine.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-green-100 text-green-800 border-green-200'
                      }`}>
                        {medicine.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">{medicine.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{medicine.units} units</p>
                      <p className="text-sm text-gray-600">{medicine.value}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      medicine.status === 'Critical' 
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : medicine.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        : 'bg-green-100 text-green-800 border-green-200'
                    }`}>
                      {medicine.status}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors rounded-xl">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors rounded-xl">
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

export default InventoryList;
