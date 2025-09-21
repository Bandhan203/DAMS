import { useState, useEffect } from 'react';
import { Plus, Search, TestTube, FileText, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const LaboratoryManagement = () => {
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('tests');

  // Dummy data for lab tests
  const dummyTests = [
    {
      id: 1,
      testNo: 'LAB2024001',
      patientName: 'John Smith',
      doctorName: 'Dr. Wilson',
      testType: 'Complete Blood Count (CBC)',
      category: 'Hematology',
      status: 'Pending',
      priority: 'Normal',
      requestDate: '2024-08-28',
      sampleType: 'Blood',
      cost: 45.00
    },
    {
      id: 2,
      testNo: 'LAB2024002',
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Anderson',
      testType: 'Lipid Profile',
      category: 'Biochemistry',
      status: 'In Progress',
      priority: 'High',
      requestDate: '2024-08-27',
      sampleType: 'Blood',
      cost: 65.00
    },
    {
      id: 3,
      testNo: 'LAB2024003',
      patientName: 'Mike Davis',
      doctorName: 'Dr. Brown',
      testType: 'Urine Analysis',
      category: 'Clinical Chemistry',
      status: 'Completed',
      priority: 'Normal',
      requestDate: '2024-08-26',
      sampleType: 'Urine',
      cost: 25.00
    },
    {
      id: 4,
      testNo: 'LAB2024004',
      patientName: 'Emily Wilson',
      doctorName: 'Dr. Garcia',
      testType: 'Thyroid Function Test',
      category: 'Endocrinology',
      status: 'Sample Collected',
      priority: 'High',
      requestDate: '2024-08-28',
      sampleType: 'Blood',
      cost: 85.00
    }
  ];

  // Dummy data for test results
  const dummyResults = [
    {
      id: 1,
      testNo: 'LAB2024003',
      patientName: 'Mike Davis',
      testType: 'Urine Analysis',
      completedDate: '2024-08-27',
      technician: 'Lab Tech Sarah',
      results: {
        'Color': 'Yellow',
        'Clarity': 'Clear',
        'Specific Gravity': '1.020',
        'pH': '6.5',
        'Protein': 'Negative',
        'Glucose': 'Negative',
        'WBC': '2-3/hpf',
        'RBC': '0-1/hpf'
      },
      status: 'Verified',
      abnormalValues: []
    },
    {
      id: 2,
      testNo: 'LAB2024005',
      patientName: 'Alice Brown',
      testType: 'Complete Blood Count',
      completedDate: '2024-08-26',
      technician: 'Lab Tech John',
      results: {
        'WBC': '12.5 x10³/μL',
        'RBC': '4.8 x10⁶/μL',
        'Hemoglobin': '14.2 g/dL',
        'Hematocrit': '42.1%',
        'Platelets': '285 x10³/μL'
      },
      status: 'Verified',
      abnormalValues: ['WBC']
    }
  ];

  useEffect(() => {
    setTests(dummyTests);
    setResults(dummyResults);
  }, []);

  const [newTest, setNewTest] = useState({
    patientName: '',
    doctorName: '',
    testType: '',
    category: '',
    priority: 'Normal',
    sampleType: ''
  });

  const [newResult, setNewResult] = useState({
    testNo: '',
    technician: '',
    results: {},
    notes: ''
  });

  const handleAddTest = () => {
    const test = {
      id: tests.length + 1,
      testNo: `LAB2024${String(tests.length + 5).padStart(3, '0')}`,
      ...newTest,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      cost: Math.random() * 100 + 20
    };
    setTests([...tests, test]);
    setNewTest({
      patientName: '',
      doctorName: '',
      testType: '',
      category: '',
      priority: 'Normal',
      sampleType: ''
    });
    setShowTestModal(false);
  };

  const handleAddResult = () => {
    const result = {
      id: results.length + 1,
      ...newResult,
      completedDate: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
      abnormalValues: []
    };
    setResults([...results, result]);
    setNewResult({
      testNo: '',
      technician: '',
      results: {},
      notes: ''
    });
    setShowResultModal(false);
  };

  // Handler functions for button functionality
  const handleCollectSample = (testId) => {
    setTests(tests.map(test => 
      test.id === testId 
        ? { ...test, status: 'Sample Collected' }
        : test
    ));
  };

  const handleStartProcessing = (testId) => {
    setTests(tests.map(test => 
      test.id === testId 
        ? { ...test, status: 'In Progress' }
        : test
    ));
  };

  const handleViewTestDetails = (test) => {
    setSelectedTest(test);
    setShowDetailsModal(true);
  };

  const handleVerifyResult = (resultId) => {
    setResults(results.map(result => 
      result.id === resultId 
        ? { ...result, status: 'Verified' }
        : result
    ));
  };

  const handlePrintReport = (result) => {
    // Create a simple print layout
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Lab Report - ${result.testNo}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .patient-info { margin: 20px 0; }
            .results { margin: 20px 0; }
            .result-item { display: flex; justify-content: space-between; padding: 5px 0; }
            .abnormal { color: red; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>DAMS Laboratory Report</h1>
            <p>Test No: ${result.testNo}</p>
          </div>
          <div class="patient-info">
            <p><strong>Patient:</strong> ${result.patientName}</p>
            <p><strong>Test Type:</strong> ${result.testType}</p>
            <p><strong>Technician:</strong> ${result.technician}</p>
            <p><strong>Completed Date:</strong> ${result.completedDate}</p>
            <p><strong>Status:</strong> ${result.status}</p>
          </div>
          <div class="results">
            <h3>Test Results:</h3>
            ${Object.entries(result.results).map(([parameter, value]) => 
              `<div class="result-item ${result.abnormalValues.includes(parameter) ? 'abnormal' : ''}">
                <span>${parameter}:</span>
                <span>${value}</span>
              </div>`
            ).join('')}
          </div>
          <div style="margin-top: 40px;">
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSendToDoctor = (result) => {
    // Simulate sending to doctor
    alert(`Lab report for ${result.testNo} has been sent to the attending physician. 
    
Patient: ${result.patientName}
Test: ${result.testType}
Status: ${result.status}
    
The doctor will be notified via email and the report will appear in their dashboard.`);
  };

  const filteredTests = tests.filter(test =>
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResults = results.filter(result =>
    result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.testNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sample Collected':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Verified':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Laboratory Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage lab tests and results efficiently</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTestModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              New Test Request
            </button>
            <button
              onClick={() => setShowResultModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Result
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {tests.filter(t => t.status === 'Pending').length}
              </p>
              <p className="text-gray-600 font-medium">Pending Tests</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <TestTube className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {tests.filter(t => t.status === 'In Progress').length}
              </p>
              <p className="text-gray-600 font-medium">In Progress</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {tests.filter(t => t.status === 'Completed').length}
              </p>
              <p className="text-gray-600 font-medium">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{results.length}</p>
              <p className="text-gray-600 font-medium">Total Results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl p-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('tests')}
            className={`pb-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === 'tests'
                ? 'border-blue-500 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <TestTube className="w-4 h-4 inline mr-2" />
            Test Requests
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`pb-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 ${
              activeTab === 'results'
                ? 'border-blue-500 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Test Results
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 shadow-xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${activeTab} by patient, doctor, test type...`}
            className="w-full pl-12 pr-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'tests' ? (
        <div className="space-y-6">
          {filteredTests.map((test) => (
            <div key={test.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <TestTube className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{test.testNo}</h3>
                    <p className="text-blue-600 font-semibold">{test.patientName}</p>
                    <p className="text-gray-600">{test.doctorName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${
                    test.status === 'Pending' ? 'from-yellow-500 to-yellow-600' :
                    test.status === 'In Progress' ? 'from-blue-500 to-blue-600' :
                    test.status === 'Completed' ? 'from-green-500 to-green-600' :
                    'from-orange-500 to-orange-600'
                  } text-white rounded-xl shadow-lg font-semibold`}>
                    <Clock className="w-4 h-4" />
                    <span>{test.status}</span>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${getPriorityColor(test.priority)}`}>
                    {test.priority} Priority
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200/50">
                  <div className="p-2 bg-green-200 rounded-lg">
                    <TestTube className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Test Type</p>
                    <p className="font-semibold text-green-800">{test.testType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
                  <div className="p-2 bg-blue-200 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Category</p>
                    <p className="font-semibold text-blue-800">{test.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200/50">
                  <div className="p-2 bg-purple-200 rounded-lg">
                    <TestTube className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Sample</p>
                    <p className="font-semibold text-purple-800">{test.sampleType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200/50">
                  <div className="p-2 bg-yellow-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Cost</p>
                    <p className="font-semibold text-yellow-800">${test.cost.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg font-medium">
                  Requested: {test.requestDate}
                </span>
                <div className="flex gap-2">
                  {test.status === 'Pending' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCollectSample(test.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
                    >
                      <TestTube className="w-4 h-4" />
                      Collect Sample
                    </button>
                  )}
                  {test.status === 'Sample Collected' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartProcessing(test.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-lg hover:shadow-orange-200/50 hover:scale-105 transition-all duration-300"
                    >
                      <Clock className="w-4 h-4" />
                      Start Processing
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewTestDetails(test);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg hover:shadow-gray-200/50 hover:scale-105 transition-all duration-300"
                  >
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredResults.map((result) => (
            <div key={result.id} className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{result.testNo}</h3>
                    <p className="text-blue-600 font-semibold">{result.patientName}</p>
                    <p className="text-gray-600">{result.testType}</p>
                    <p className="text-gray-600">Technician: {result.technician}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${
                    result.status === 'Verified' ? 'from-green-500 to-green-600' :
                    result.status === 'Pending Review' ? 'from-yellow-500 to-yellow-600' :
                    'from-blue-500 to-blue-600'
                  } text-white rounded-xl shadow-lg font-semibold`}>
                    <CheckCircle className="w-4 h-4" />
                    <span>{result.status}</span>
                  </div>
                  {result.abnormalValues.length > 0 && (
                    <div className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg font-semibold border border-red-200">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      Abnormal Values
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Test Results:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(result.results).map(([parameter, value]) => (
                    <div key={parameter} className={`p-4 rounded-xl border transition-all duration-300 ${
                      result.abnormalValues.includes(parameter) 
                        ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-lg' 
                        : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:shadow-lg'
                    }`}>
                      <p className="text-sm font-medium text-gray-600 mb-1">{parameter}</p>
                      <p className={`font-bold text-lg ${
                        result.abnormalValues.includes(parameter) 
                          ? 'text-red-700' 
                          : 'text-gray-900'
                      }`}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg font-medium">
                  Completed: {result.completedDate}
                </span>
                <div className="flex gap-2">
                  {result.status === 'Pending Review' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerifyResult(result.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200/50 hover:scale-105 transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verify
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrintReport(result);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
                  >
                    <FileText className="w-4 h-4" />
                    Print Report
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendToDoctor(result);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
                  >
                    <Users className="w-4 h-4" />
                    Send to Doctor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Test Modal */}
      <Modal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        title="New Test Request"
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
                value={newTest.patientName}
                onChange={(e) => setNewTest({ ...newTest, patientName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTest.doctorName}
                onChange={(e) => setNewTest({ ...newTest, doctorName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTest.testType}
                onChange={(e) => setNewTest({ ...newTest, testType: e.target.value })}
              >
                <option value="">Select Test Type</option>
                <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                <option value="Lipid Profile">Lipid Profile</option>
                <option value="Liver Function Test">Liver Function Test</option>
                <option value="Kidney Function Test">Kidney Function Test</option>
                <option value="Thyroid Function Test">Thyroid Function Test</option>
                <option value="Urine Analysis">Urine Analysis</option>
                <option value="Blood Sugar">Blood Sugar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTest.category}
                onChange={(e) => setNewTest({ ...newTest, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Hematology">Hematology</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Clinical Chemistry">Clinical Chemistry</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Microbiology">Microbiology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTest.sampleType}
                onChange={(e) => setNewTest({ ...newTest, sampleType: e.target.value })}
              >
                <option value="">Select Sample Type</option>
                <option value="Blood">Blood</option>
                <option value="Urine">Urine</option>
                <option value="Stool">Stool</option>
                <option value="Saliva">Saliva</option>
                <option value="Tissue">Tissue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTest.priority}
                onChange={(e) => setNewTest({ ...newTest, priority: e.target.value })}
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowTestModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTest}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Test Request
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Result Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="Add Test Result"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Number
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newResult.testNo}
                onChange={(e) => setNewResult({ ...newResult, testNo: e.target.value })}
              >
                <option value="">Select Test</option>
                {tests.filter(t => t.status === 'In Progress').map(test => (
                  <option key={test.id} value={test.testNo}>
                    {test.testNo} - {test.patientName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technician
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newResult.technician}
                onChange={(e) => setNewResult({ ...newResult, technician: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={newResult.notes}
              onChange={(e) => setNewResult({ ...newResult, notes: e.target.value })}
              placeholder="Additional notes about the test results..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowResultModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddResult}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Add Result
            </Button>
          </div>
        </div>
      </Modal>

      {/* Test Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Test Details"
      >
        {selectedTest && (
          <div className="space-y-6">
            {/* Test Information */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Test Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600">Test Number</p>
                  <p className="text-lg font-bold text-blue-900">{selectedTest.testNo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Test Type</p>
                  <p className="text-lg font-bold text-blue-900">{selectedTest.testType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Category</p>
                  <p className="text-lg font-bold text-blue-900">{selectedTest.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Sample Type</p>
                  <p className="text-lg font-bold text-blue-900">{selectedTest.sampleType}</p>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-600">Patient Name</p>
                  <p className="text-lg font-bold text-green-900">{selectedTest.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Requesting Doctor</p>
                  <p className="text-lg font-bold text-green-900">{selectedTest.doctorName}</p>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Status Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-purple-600">Current Status</p>
                  <span className={`inline-block px-4 py-2 rounded-xl font-bold text-sm ${
                    selectedTest.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    selectedTest.status === 'Sample Collected' ? 'bg-blue-200 text-blue-800' :
                    selectedTest.status === 'In Progress' ? 'bg-orange-200 text-orange-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {selectedTest.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Priority</p>
                  <span className={`inline-block px-4 py-2 rounded-xl font-bold text-sm ${
                    selectedTest.priority === 'High' ? 'bg-red-200 text-red-800' :
                    selectedTest.priority === 'Normal' ? 'bg-green-200 text-green-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {selectedTest.priority} Priority
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Request Date</p>
                  <p className="text-lg font-bold text-purple-900">{selectedTest.requestDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Estimated Cost</p>
                  <p className="text-lg font-bold text-purple-900">${selectedTest.cost.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {selectedTest.status === 'Pending' && (
                <button 
                  onClick={() => {
                    handleCollectSample(selectedTest.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
                >
                  <TestTube className="w-5 h-5" />
                  Collect Sample
                </button>
              )}
              {selectedTest.status === 'Sample Collected' && (
                <button 
                  onClick={() => {
                    handleStartProcessing(selectedTest.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-lg hover:shadow-orange-200/50 hover:scale-105 transition-all duration-300"
                >
                  <Clock className="w-5 h-5" />
                  Start Processing
                </button>
              )}
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg hover:shadow-gray-200/50 hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LaboratoryManagement;
