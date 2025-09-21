import { useState, useEffect } from 'react';
import { Plus, Search, FileText, User, Calendar, Clock, Printer, Send } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const PrescriptionManagement = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Dummy data for prescriptions
  const dummyPrescriptions = [
    {
      id: 1,
      prescriptionNo: 'RX2024001',
      patientName: 'John Smith',
      patientId: 'P001',
      age: 45,
      gender: 'Male',
      doctorName: 'Dr. Wilson',
      visitDate: '2024-08-28',
      visitTime: '10:30 AM',
      diagnosis: 'Hypertension',
      symptoms: 'High blood pressure, headache, dizziness',
      medications: [
        { 
          name: 'Lisinopril 10mg', 
          dosage: '1 tablet once daily in the morning', 
          duration: '30 days',
          quantity: 30,
          instructions: 'Take with or without food'
        },
        { 
          name: 'Aspirin 81mg', 
          dosage: '1 tablet once daily', 
          duration: '30 days',
          quantity: 30,
          instructions: 'Take with food to reduce stomach irritation'
        }
      ],
      advice: 'Follow low sodium diet, regular exercise, monitor blood pressure daily',
      followUp: '2024-09-28',
      status: 'Active',
      issuedDate: '2024-08-28',
      issuedTime: '11:00 AM'
    },
    {
      id: 2,
      prescriptionNo: 'RX2024002',
      patientName: 'Sarah Johnson',
      patientId: 'P002',
      age: 32,
      gender: 'Female',
      doctorName: 'Dr. Anderson',
      visitDate: '2024-08-27',
      visitTime: '2:15 PM',
      diagnosis: 'Upper Respiratory Infection',
      symptoms: 'Cough, sore throat, mild fever',
      medications: [
        { 
          name: 'Azithromycin 500mg', 
          dosage: '1 tablet once daily', 
          duration: '5 days',
          quantity: 5,
          instructions: 'Take on empty stomach, 1 hour before or 2 hours after meals'
        },
        { 
          name: 'Dextromethorphan 15mg', 
          dosage: '1 tablet every 4-6 hours as needed', 
          duration: '7 days',
          quantity: 20,
          instructions: 'For cough suppression, do not exceed 6 tablets per day'
        }
      ],
      advice: 'Rest, increase fluid intake, avoid cold beverages',
      followUp: '2024-09-03',
      status: 'Active',
      issuedDate: '2024-08-27',
      issuedTime: '2:45 PM'
    },
    {
      id: 3,
      prescriptionNo: 'RX2024003',
      patientName: 'Mike Davis',
      patientId: 'P003',
      age: 28,
      gender: 'Male',
      doctorName: 'Dr. Brown',
      visitDate: '2024-08-25',
      visitTime: '9:00 AM',
      diagnosis: 'Type 2 Diabetes',
      symptoms: 'Frequent urination, increased thirst, fatigue',
      medications: [
        { 
          name: 'Metformin 500mg', 
          dosage: '1 tablet twice daily with meals', 
          duration: '30 days',
          quantity: 60,
          instructions: 'Take with breakfast and dinner'
        },
        { 
          name: 'Glipizide 5mg', 
          dosage: '1 tablet once daily before breakfast', 
          duration: '30 days',
          quantity: 30,
          instructions: 'Monitor blood sugar regularly'
        }
      ],
      advice: 'Follow diabetic diet, regular exercise, monitor blood glucose twice daily',
      followUp: '2024-09-25',
      status: 'Completed',
      issuedDate: '2024-08-25',
      issuedTime: '9:30 AM'
    }
  ];

  // Dummy data for patients
  const dummyPatients = [
    { id: 'P001', name: 'John Smith', age: 45, gender: 'Male', phone: '555-0123' },
    { id: 'P002', name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '555-0456' },
    { id: 'P003', name: 'Mike Davis', age: 28, gender: 'Male', phone: '555-0789' },
    { id: 'P004', name: 'Emily Wilson', age: 55, gender: 'Female', phone: '555-0321' },
    { id: 'P005', name: 'Robert Brown', age: 62, gender: 'Male', phone: '555-0654' }
  ];

  useEffect(() => {
    setPrescriptions(dummyPrescriptions);
    setPatients(dummyPatients);
  }, []);

  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    patientName: '',
    diagnosis: '',
    symptoms: '',
    medications: [{ name: '', dosage: '', duration: '', quantity: '', instructions: '' }],
    advice: '',
    followUp: ''
  });

  const handleAddPrescription = () => {
    const selectedPatient = patients.find(p => p.id === newPrescription.patientId);
    const prescription = {
      id: prescriptions.length + 1,
      prescriptionNo: `RX2024${String(prescriptions.length + 4).padStart(3, '0')}`,
      ...newPrescription,
      patientName: selectedPatient?.name || newPrescription.patientName,
      age: selectedPatient?.age || 0,
      gender: selectedPatient?.gender || '',
      doctorName: 'Dr. Current User', // This would come from auth context
      visitDate: new Date().toISOString().split('T')[0],
      visitTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Active',
      issuedDate: new Date().toISOString().split('T')[0],
      issuedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      patientId: '',
      patientName: '',
      diagnosis: '',
      symptoms: '',
      medications: [{ name: '', dosage: '', duration: '', quantity: '', instructions: '' }],
      advice: '',
      followUp: ''
    });
    setShowPrescriptionModal(false);
  };

  const addMedicationField = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [...newPrescription.medications, { name: '', dosage: '', duration: '', quantity: '', instructions: '' }]
    });
  };

  const updateMedicationField = (index, field, value) => {
    const updatedMedications = newPrescription.medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setNewPrescription({ ...newPrescription, medications: updatedMedications });
  };

  const removeMedicationField = (index) => {
    if (newPrescription.medications.length > 1) {
      const updatedMedications = newPrescription.medications.filter((_, i) => i !== index);
      setNewPrescription({ ...newPrescription, medications: updatedMedications });
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.prescriptionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || prescription.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Chamber Prescriptions</h1>
          <p className="text-gray-600 mt-1">Create and manage patient prescriptions</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setShowPrescriptionModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Prescription
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
              <p className="text-gray-600">Total Prescriptions</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {prescriptions.filter(p => p.status === 'Active').length}
              </p>
              <p className="text-gray-600">Active Prescriptions</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {prescriptions.filter(p => p.visitDate === new Date().toISOString().split('T')[0]).length}
              </p>
              <p className="text-gray-600">Today's Prescriptions</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
              <p className="text-gray-600">Registered Patients</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{prescription.prescriptionNo}</h3>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(prescription.status)}`}>
                    {prescription.status}
                  </span>
                </div>
                <p className="text-xl font-medium text-gray-800">{prescription.patientName}</p>
                <p className="text-gray-600">Age: {prescription.age} | Gender: {prescription.gender}</p>
                <p className="text-gray-600">Doctor: {prescription.doctorName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Visit Date</p>
                <p className="font-medium">{prescription.visitDate}</p>
                <p className="text-sm text-gray-600">{prescription.visitTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Diagnosis</p>
                <p className="font-medium">{prescription.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Follow-up Date</p>
                <p className="font-medium">{prescription.followUp}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Symptoms</p>
              <p className="text-gray-800">{prescription.symptoms}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Medications:</h4>
              <div className="space-y-2">
                {prescription.medications.map((med, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-blue-700">{med.name}</p>
                      <span className="text-sm text-gray-600">Qty: {med.quantity}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Dosage:</strong> {med.dosage}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Duration:</strong> {med.duration}
                    </p>
                    {med.instructions && (
                      <p className="text-sm text-gray-600 italic">
                        <strong>Instructions:</strong> {med.instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {prescription.advice && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Doctor's Advice:</h4>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">{prescription.advice}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>Issued: {prescription.issuedDate} at {prescription.issuedTime}</p>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  <Printer className="w-4 h-4 mr-1" />
                  Print
                </Button>
                <Button size="sm" variant="outline">
                  <Send className="w-4 h-4 mr-1" />
                  Send to Pharmacy
                </Button>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setSelectedPrescription(prescription)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* New Prescription Modal */}
      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        title="Create New Prescription"
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPrescription.patientId}
                onChange={(e) => {
                  const selectedPatient = patients.find(p => p.id === e.target.value);
                  setNewPrescription({ 
                    ...newPrescription, 
                    patientId: e.target.value,
                    patientName: selectedPatient?.name || ''
                  });
                }}
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow-up Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPrescription.followUp}
                onChange={(e) => setNewPrescription({ ...newPrescription, followUp: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPrescription.diagnosis}
              onChange={(e) => setNewPrescription({ ...newPrescription, diagnosis: e.target.value })}
              placeholder="Primary diagnosis"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symptoms
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              value={newPrescription.symptoms}
              onChange={(e) => setNewPrescription({ ...newPrescription, symptoms: e.target.value })}
              placeholder="Patient symptoms and complaints"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medications
            </label>
            {newPrescription.medications.map((medication, index) => (
              <div key={index} className="border border-gray-200 p-3 rounded-lg mb-3">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Medication name"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={medication.name}
                    onChange={(e) => updateMedicationField(index, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 7 days)"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={medication.duration}
                    onChange={(e) => updateMedicationField(index, 'duration', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Dosage (e.g., 1 tablet twice daily)"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={medication.dosage}
                    onChange={(e) => updateMedicationField(index, 'dosage', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={medication.quantity}
                    onChange={(e) => updateMedicationField(index, 'quantity', e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Special instructions (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={medication.instructions}
                  onChange={(e) => updateMedicationField(index, 'instructions', e.target.value)}
                />
                {newPrescription.medications.length > 1 && (
                  <div className="mt-2 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMedicationField(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                )}
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
              Doctor's Advice
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={newPrescription.advice}
              onChange={(e) => setNewPrescription({ ...newPrescription, advice: e.target.value })}
              placeholder="Lifestyle recommendations, dietary advice, precautions, etc."
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Prescription
            </Button>
          </div>
        </div>
      </Modal>

      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <Modal
          isOpen={!!selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
          title={`Prescription Details - ${selectedPrescription.prescriptionNo}`}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Patient Name</p>
                <p className="font-medium">{selectedPrescription.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Patient ID</p>
                <p className="font-medium">{selectedPrescription.patientId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{selectedPrescription.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium">{selectedPrescription.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Visit Date</p>
                <p className="font-medium">{selectedPrescription.visitDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Doctor</p>
                <p className="font-medium">{selectedPrescription.doctorName}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Diagnosis</p>
              <p className="font-medium">{selectedPrescription.diagnosis}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Symptoms</p>
              <p className="text-gray-800">{selectedPrescription.symptoms}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Medications:</h4>
              <div className="space-y-2">
                {selectedPrescription.medications.map((med, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-blue-700">{med.name}</p>
                      <span className="text-sm text-gray-600">Qty: {med.quantity}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Dosage:</strong> {med.dosage}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Duration:</strong> {med.duration}
                    </p>
                    {med.instructions && (
                      <p className="text-sm text-gray-600 italic">
                        <strong>Instructions:</strong> {med.instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedPrescription.advice && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Doctor's Advice:</h4>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">{selectedPrescription.advice}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Follow-up Date</p>
                <p className="font-medium">{selectedPrescription.followUp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedPrescription.status)}`}>
                  {selectedPrescription.status}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setSelectedPrescription(null)}>
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Printer className="w-4 h-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PrescriptionManagement;
