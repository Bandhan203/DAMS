import { useState, useEffect } from 'react';
import { Plus, Search, AlertTriangle, Clock, User, Activity, FileText, Phone } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const EmergencyManagement = () => {
  const [emergencyCases, setEmergencyCases] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('cases');
  const [selectedCase, setSelectedCase] = useState(null);

  // Dummy data for emergency cases
  const dummyEmergencyCases = [
    {
      id: 1,
      caseNo: 'ER2024001',
      patientName: 'John Smith',
      age: 45,
      gender: 'Male',
      arrivalTime: '2024-08-28T14:30:00',
      chiefComplaint: 'Severe chest pain',
      triageLevel: 'Critical',
      vitals: {
        bloodPressure: '180/110',
        heartRate: '110 bpm',
        temperature: '98.6°F',
        oxygenSaturation: '92%',
        respiratoryRate: '22/min'
      },
      status: 'In Treatment',
      assignedDoctor: 'Dr. Wilson',
      assignedNurse: 'Nurse Sarah',
      location: 'Trauma Bay 1',
      emergencyContact: 'Jane Smith - 555-0123'
    },
    {
      id: 2,
      caseNo: 'ER2024002',
      patientName: 'Maria Garcia',
      age: 28,
      gender: 'Female',
      arrivalTime: '2024-08-28T15:45:00',
      chiefComplaint: 'Severe abdominal pain',
      triageLevel: 'Urgent',
      vitals: {
        bloodPressure: '130/85',
        heartRate: '95 bpm',
        temperature: '101.2°F',
        oxygenSaturation: '98%',
        respiratoryRate: '18/min'
      },
      status: 'Waiting for Doctor',
      assignedDoctor: 'Dr. Anderson',
      assignedNurse: 'Nurse Mike',
      location: 'ER Bed 3',
      emergencyContact: 'Carlos Garcia - 555-0456'
    },
    {
      id: 3,
      caseNo: 'ER2024003',
      patientName: 'Robert Johnson',
      age: 65,
      gender: 'Male',
      arrivalTime: '2024-08-28T16:20:00',
      chiefComplaint: 'Fall with possible fracture',
      triageLevel: 'Less Urgent',
      vitals: {
        bloodPressure: '140/90',
        heartRate: '85 bpm',
        temperature: '98.4°F',
        oxygenSaturation: '96%',
        respiratoryRate: '16/min'
      },
      status: 'Discharged',
      assignedDoctor: 'Dr. Brown',
      assignedNurse: 'Nurse Lisa',
      location: 'ER Bed 5',
      emergencyContact: 'Susan Johnson - 555-0789',
      dischargeTime: '2024-08-28T18:15:00'
    }
  ];

  // Dummy data for emergency prescriptions
  const dummyPrescriptions = [
    {
      id: 1,
      prescriptionNo: 'ERP2024001',
      caseNo: 'ER2024001',
      patientName: 'John Smith',
      doctorName: 'Dr. Wilson',
      medications: [
        { name: 'Nitroglycerin 0.4mg', dosage: 'Sublingual as needed for chest pain', quantity: 25 },
        { name: 'Aspirin 81mg', dosage: '1 tablet daily', quantity: 30 },
        { name: 'Metoprolol 50mg', dosage: '1 tablet twice daily', quantity: 60 }
      ],
      instructions: 'Follow up with cardiologist within 48 hours. Return to ER if chest pain worsens.',
      issuedDate: '2024-08-28',
      issuedTime: '16:30',
      status: 'Active'
    },
    {
      id: 2,
      prescriptionNo: 'ERP2024002',
      caseNo: 'ER2024002',
      patientName: 'Maria Garcia',
      doctorName: 'Dr. Anderson',
      medications: [
        { name: 'Morphine 10mg', dosage: 'IV push for pain (administered in ER)', quantity: 1 },
        { name: 'Ondansetron 4mg', dosage: 'For nausea as needed', quantity: 10 },
        { name: 'Ciprofloxacin 500mg', dosage: '1 tablet twice daily for 7 days', quantity: 14 }
      ],
      instructions: 'Follow up with gastroenterologist if symptoms persist. Return if fever increases.',
      issuedDate: '2024-08-28',
      issuedTime: '17:15',
      status: 'Active'
    }
  ];

  useEffect(() => {
    setEmergencyCases(dummyEmergencyCases);
    setPrescriptions(dummyPrescriptions);
  }, []);

  const [newCase, setNewCase] = useState({
    patientName: '',
    age: '',
    gender: '',
    chiefComplaint: '',
    triageLevel: '',
    emergencyContact: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: '',
      respiratoryRate: ''
    }
  });

  const [newPrescription, setNewPrescription] = useState({
    caseNo: '',
    patientName: '',
    doctorName: '',
    medications: [{ name: '', dosage: '', quantity: '' }],
    instructions: ''
  });

  const handleAddCase = () => {
    const emergencyCase = {
      id: emergencyCases.length + 1,
      caseNo: `ER2024${String(emergencyCases.length + 4).padStart(3, '0')}`,
      ...newCase,
      age: parseInt(newCase.age),
      arrivalTime: new Date().toISOString(),
      status: 'Triage',
      assignedDoctor: '',
      assignedNurse: '',
      location: 'Triage Area'
    };
    setEmergencyCases([...emergencyCases, emergencyCase]);
    setNewCase({
      patientName: '',
      age: '',
      gender: '',
      chiefComplaint: '',
      triageLevel: '',
      emergencyContact: '',
      vitals: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        oxygenSaturation: '',
        respiratoryRate: ''
      }
    });
    setShowCaseModal(false);
  };

  const handleAddPrescription = () => {
    const prescription = {
      id: prescriptions.length + 1,
      prescriptionNo: `ERP2024${String(prescriptions.length + 3).padStart(3, '0')}`,
      ...newPrescription,
      issuedDate: new Date().toISOString().split('T')[0],
      issuedTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      status: 'Active'
    };
    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      caseNo: '',
      patientName: '',
      doctorName: '',
      medications: [{ name: '', dosage: '', quantity: '' }],
      instructions: ''
    });
    setShowPrescriptionModal(false);
  };

  const addMedicationField = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [...newPrescription.medications, { name: '', dosage: '', quantity: '' }]
    });
  };

  const updateMedicationField = (index, field, value) => {
    const updatedMedications = newPrescription.medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setNewPrescription({ ...newPrescription, medications: updatedMedications });
  };

  const filteredCases = emergencyCases.filter(emergencyCase =>
    emergencyCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emergencyCase.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emergencyCase.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.prescriptionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.caseNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTriageColor = (level) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Urgent':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Less Urgent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Non-Urgent':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Triage':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting for Doctor':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Treatment':
        return 'bg-orange-100 text-orange-800';
      case 'Discharged':
        return 'bg-green-100 text-green-800';
      case 'Admitted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWaitingTime = (arrivalTime) => {
    const arrival = new Date(arrivalTime);
    const now = new Date();
    const diffInMinutes = Math.floor((now - arrival) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emergency Department</h1>
          <p className="text-gray-600 mt-1">Emergency cases and prescriptions management</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setShowCaseModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Emergency Case
          </Button>
          <Button
            onClick={() => setShowPrescriptionModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Emergency Prescription
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {emergencyCases.filter(c => c.triageLevel === 'Critical').length}
              </p>
              <p className="text-gray-600">Critical Cases</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {emergencyCases.filter(c => c.status === 'Waiting for Doctor').length}
              </p>
              <p className="text-gray-600">Waiting</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {emergencyCases.filter(c => c.status === 'In Treatment').length}
              </p>
              <p className="text-gray-600">In Treatment</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {emergencyCases.filter(c => c.status === 'Discharged').length}
              </p>
              <p className="text-gray-600">Discharged Today</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('cases')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'cases'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Emergency Cases
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'prescriptions'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Emergency Prescriptions
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content */}
      {activeTab === 'cases' ? (
        <div className="space-y-4">
          {filteredCases.map((emergencyCase) => (
            <Card key={emergencyCase.id} className={`p-6 border-l-4 ${
              emergencyCase.triageLevel === 'Critical' ? 'border-l-red-500 bg-red-50' :
              emergencyCase.triageLevel === 'Urgent' ? 'border-l-orange-500 bg-orange-50' :
              emergencyCase.triageLevel === 'Less Urgent' ? 'border-l-yellow-500 bg-yellow-50' :
              'border-l-green-500 bg-green-50'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{emergencyCase.caseNo}</h3>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full border ${getTriageColor(emergencyCase.triageLevel)}`}>
                      {emergencyCase.triageLevel}
                    </span>
                  </div>
                  <p className="text-xl font-medium text-gray-800">{emergencyCase.patientName}</p>
                  <p className="text-gray-600">Age: {emergencyCase.age} | Gender: {emergencyCase.gender}</p>
                  <p className="text-gray-700 font-medium mt-1">Chief Complaint: {emergencyCase.chiefComplaint}</p>
                </div>
                <div className="text-right space-y-2">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(emergencyCase.status)}`}>
                    {emergencyCase.status}
                  </span>
                  <div className="text-sm text-gray-600">
                    <p>Waiting: {getWaitingTime(emergencyCase.arrivalTime)}</p>
                    <p>Location: {emergencyCase.location}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-4 bg-white rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Blood Pressure</p>
                  <p className="font-medium">{emergencyCase.vitals.bloodPressure}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Heart Rate</p>
                  <p className="font-medium">{emergencyCase.vitals.heartRate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Temperature</p>
                  <p className="font-medium">{emergencyCase.vitals.temperature}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">O2 Saturation</p>
                  <p className="font-medium">{emergencyCase.vitals.oxygenSaturation}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Respiratory Rate</p>
                  <p className="font-medium">{emergencyCase.vitals.respiratoryRate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Assigned Doctor</p>
                  <p className="font-medium">{emergencyCase.assignedDoctor || 'Not Assigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned Nurse</p>
                  <p className="font-medium">{emergencyCase.assignedNurse || 'Not Assigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Emergency Contact</p>
                  <p className="font-medium">{emergencyCase.emergencyContact}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Arrival: {new Date(emergencyCase.arrivalTime).toLocaleString()}</p>
                  {emergencyCase.dischargeTime && (
                    <p>Discharged: {new Date(emergencyCase.dischargeTime).toLocaleString()}</p>
                  )}
                </div>
                <div className="space-x-2">
                  {emergencyCase.status !== 'Discharged' && (
                    <>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Assign Doctor
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Update Status
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{prescription.prescriptionNo}</h3>
                  <p className="text-gray-600">Case: {prescription.caseNo}</p>
                  <p className="text-gray-600">Patient: {prescription.patientName}</p>
                  <p className="text-gray-600">Doctor: {prescription.doctorName}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    {prescription.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">
                    {prescription.issuedDate} at {prescription.issuedTime}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Medications:</h4>
                <div className="space-y-2">
                  {prescription.medications.map((med, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-600">{med.dosage}</p>
                        </div>
                        <span className="text-sm font-medium">Qty: {med.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {prescription.instructions && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Special Instructions:</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">{prescription.instructions}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline">
                  Print Prescription
                </Button>
                <Button size="sm" variant="outline">
                  Send to Pharmacy
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  View Case
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Emergency Case Modal */}
      <Modal
        isOpen={showCaseModal}
        onClose={() => setShowCaseModal(false)}
        title="New Emergency Case"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newCase.patientName}
                onChange={(e) => setNewCase({ ...newCase, patientName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newCase.age}
                onChange={(e) => setNewCase({ ...newCase, age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newCase.gender}
                onChange={(e) => setNewCase({ ...newCase, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Triage Level
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newCase.triageLevel}
                onChange={(e) => setNewCase({ ...newCase, triageLevel: e.target.value })}
              >
                <option value="">Select Triage Level</option>
                <option value="Critical">Critical</option>
                <option value="Urgent">Urgent</option>
                <option value="Less Urgent">Less Urgent</option>
                <option value="Non-Urgent">Non-Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chief Complaint
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="2"
              value={newCase.chiefComplaint}
              onChange={(e) => setNewCase({ ...newCase, chiefComplaint: e.target.value })}
              placeholder="Primary reason for visit..."
            />
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Vital Signs</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Pressure
                </label>
                <input
                  type="text"
                  placeholder="120/80"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={newCase.vitals.bloodPressure}
                  onChange={(e) => setNewCase({ 
                    ...newCase, 
                    vitals: { ...newCase.vitals, bloodPressure: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heart Rate
                </label>
                <input
                  type="text"
                  placeholder="72 bpm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={newCase.vitals.heartRate}
                  onChange={(e) => setNewCase({ 
                    ...newCase, 
                    vitals: { ...newCase.vitals, heartRate: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature
                </label>
                <input
                  type="text"
                  placeholder="98.6°F"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={newCase.vitals.temperature}
                  onChange={(e) => setNewCase({ 
                    ...newCase, 
                    vitals: { ...newCase.vitals, temperature: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O2 Saturation
                </label>
                <input
                  type="text"
                  placeholder="98%"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={newCase.vitals.oxygenSaturation}
                  onChange={(e) => setNewCase({ 
                    ...newCase, 
                    vitals: { ...newCase.vitals, oxygenSaturation: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact
            </label>
            <input
              type="text"
              placeholder="Name - Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={newCase.emergencyContact}
              onChange={(e) => setNewCase({ ...newCase, emergencyContact: e.target.value })}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowCaseModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCase}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Register Emergency Case
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Prescription Modal */}
      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        title="Emergency Prescription"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Case
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newPrescription.caseNo}
                onChange={(e) => {
                  const selectedCase = emergencyCases.find(c => c.caseNo === e.target.value);
                  setNewPrescription({ 
                    ...newPrescription, 
                    caseNo: e.target.value,
                    patientName: selectedCase?.patientName || ''
                  });
                }}
              >
                <option value="">Select Emergency Case</option>
                {emergencyCases.filter(c => c.status !== 'Discharged').map(emergencyCase => (
                  <option key={emergencyCase.id} value={emergencyCase.caseNo}>
                    {emergencyCase.caseNo} - {emergencyCase.patientName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newPrescription.doctorName}
                onChange={(e) => setNewPrescription({ ...newPrescription, doctorName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medications
            </label>
            {newPrescription.medications.map((medication, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Medication name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={medication.name}
                  onChange={(e) => updateMedicationField(index, 'name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Dosage instructions"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={medication.dosage}
                  onChange={(e) => updateMedicationField(index, 'dosage', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={medication.quantity}
                  onChange={(e) => updateMedicationField(index, 'quantity', e.target.value)}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMedicationField}
              className="mt-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Medication
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
              value={newPrescription.instructions}
              onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
              placeholder="Follow-up instructions, warnings, or additional notes..."
            />
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
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Issue Prescription
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmergencyManagement;
