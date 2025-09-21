import React, { createContext, useContext, useState } from 'react';
import { 
  mockPatients, mockDoctors, mockAppointments, mockMedicines, 
  mockInvoices, mockStaff, mockNotifications, mockServices,
  mockCommunicationLogs, mockWaitingList, mockAuditLogs
} from '../data/mockData.js';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [currentUser] = useState(mockStaff[0]);
  const [userRole, setUserRole] = useState('admin');
  const [activeSection, setActiveSection] = useState('dashboard');

  // Data states
  const [patients, setPatients] = useState(mockPatients);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [medicines, setMedicines] = useState(mockMedicines);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [staff] = useState(mockStaff);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [services] = useState(mockServices);
  const [communicationLogs, setCommunicationLogs] = useState(mockCommunicationLogs);
  const [waitingList, setWaitingList] = useState(mockWaitingList);
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);

  // Helper function to generate IDs
  const generateId = () => Date.now().toString();

  // Patient CRUD operations
  const addPatient = (patientData) => {
    const newPatient = {
      ...patientData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPatients(prev => [...prev, newPatient]);
    addAuditLog({
      userId: currentUser?.id || 'system',
      action: 'CREATE',
      resource: 'patient',
      resourceId: newPatient.id,
      newValues: newPatient,
      ipAddress: '192.168.1.100',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  };

  const updatePatient = (id, patientData) => {
    const oldPatient = patients.find(p => p.id === id);
    setPatients(prev => 
      prev.map(patient => 
        patient.id === id 
          ? { ...patient, ...patientData, updatedAt: new Date().toISOString() }
          : patient
      )
    );
    if (oldPatient) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'UPDATE',
        resource: 'patient',
        resourceId: id,
        oldValues: oldPatient,
        newValues: patientData,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  const deletePatient = (id) => {
    const deletedPatient = patients.find(p => p.id === id);
    setPatients(prev => prev.filter(patient => patient.id !== id));
    if (deletedPatient) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'DELETE',
        resource: 'patient',
        resourceId: id,
        oldValues: deletedPatient,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Appointment CRUD operations
  const addAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setAppointments(prev => [...prev, newAppointment]);
    addAuditLog({
      userId: currentUser?.id || 'system',
      action: 'CREATE',
      resource: 'appointment',
      resourceId: newAppointment.id,
      newValues: newAppointment,
      ipAddress: '192.168.1.100',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  };

  const updateAppointment = (id, appointmentData) => {
    const oldAppointment = appointments.find(a => a.id === id);
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, ...appointmentData, updatedAt: new Date().toISOString() }
          : appointment
      )
    );
    if (oldAppointment) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'UPDATE',
        resource: 'appointment',
        resourceId: id,
        oldValues: oldAppointment,
        newValues: appointmentData,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  const deleteAppointment = (id) => {
    const deletedAppointment = appointments.find(a => a.id === id);
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
    if (deletedAppointment) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'DELETE',
        resource: 'appointment',
        resourceId: id,
        oldValues: deletedAppointment,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Doctor CRUD operations
  const addDoctor = (doctorData) => {
    const newDoctor = {
      ...doctorData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setDoctors(prev => [...prev, newDoctor]);
    addAuditLog({
      userId: currentUser?.id || 'system',
      action: 'CREATE',
      resource: 'doctor',
      resourceId: newDoctor.id,
      newValues: newDoctor,
      ipAddress: '192.168.1.100',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  };

  const updateDoctor = (id, doctorData) => {
    const oldDoctor = doctors.find(d => d.id === id);
    setDoctors(prev => 
      prev.map(doctor => 
        doctor.id === id 
          ? { ...doctor, ...doctorData }
          : doctor
      )
    );
    if (oldDoctor) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'UPDATE',
        resource: 'doctor',
        resourceId: id,
        oldValues: oldDoctor,
        newValues: doctorData,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  const deleteDoctor = (id) => {
    const deletedDoctor = doctors.find(d => d.id === id);
    setDoctors(prev => prev.filter(doctor => doctor.id !== id));
    if (deletedDoctor) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'DELETE',
        resource: 'doctor',
        resourceId: id,
        oldValues: deletedDoctor,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Medicine CRUD operations
  const addMedicine = (medicineData) => {
    const newMedicine = {
      ...medicineData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setMedicines(prev => [...prev, newMedicine]);
    addAuditLog({
      userId: currentUser?.id || 'system',
      action: 'CREATE',
      resource: 'medicine',
      resourceId: newMedicine.id,
      newValues: newMedicine,
      ipAddress: '192.168.1.100',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  };

  const updateMedicine = (id, medicineData) => {
    const oldMedicine = medicines.find(m => m.id === id);
    setMedicines(prev => 
      prev.map(medicine => 
        medicine.id === id 
          ? { ...medicine, ...medicineData, updatedAt: new Date().toISOString() }
          : medicine
      )
    );
    if (oldMedicine) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'UPDATE',
        resource: 'medicine',
        resourceId: id,
        oldValues: oldMedicine,
        newValues: medicineData,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  const deleteMedicine = (id) => {
    const deletedMedicine = medicines.find(m => m.id === id);
    setMedicines(prev => prev.filter(medicine => medicine.id !== id));
    if (deletedMedicine) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'DELETE',
        resource: 'medicine',
        resourceId: id,
        oldValues: deletedMedicine,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Invoice CRUD operations
  const addInvoice = (invoiceData) => {
    const newInvoice = {
      ...invoiceData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setInvoices(prev => [...prev, newInvoice]);
    addAuditLog({
      userId: currentUser?.id || 'system',
      action: 'CREATE',
      resource: 'invoice',
      resourceId: newInvoice.id,
      newValues: newInvoice,
      ipAddress: '192.168.1.100',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  };

  const updateInvoice = (id, invoiceData) => {
    const oldInvoice = invoices.find(i => i.id === id);
    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === id 
          ? { ...invoice, ...invoiceData }
          : invoice
      )
    );
    if (oldInvoice) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'UPDATE',
        resource: 'invoice',
        resourceId: id,
        oldValues: oldInvoice,
        newValues: invoiceData,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  const deleteInvoice = (id) => {
    const deletedInvoice = invoices.find(i => i.id === id);
    setInvoices(prev => prev.filter(invoice => invoice.id !== id));
    if (deletedInvoice) {
      addAuditLog({
        userId: currentUser?.id || 'system',
        action: 'DELETE',
        resource: 'invoice',
        resourceId: id,
        oldValues: deletedInvoice,
        ipAddress: '192.168.1.100',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Notification operations
  const markNotificationRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const addNotification = (notificationData) => {
    const newNotification = {
      ...notificationData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  // Communication operations
  const addCommunicationLog = (logData) => {
    const newLog = {
      ...logData,
      id: generateId()
    };
    setCommunicationLogs(prev => [...prev, newLog]);
  };

  // Waiting list operations
  const addToWaitingList = (entryData) => {
    const newEntry = {
      ...entryData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setWaitingList(prev => [...prev, newEntry]);
  };

  const updateWaitingListEntry = (id, entryData) => {
    setWaitingList(prev => 
      prev.map(entry => 
        entry.id === id 
          ? { ...entry, ...entryData }
          : entry
      )
    );
  };

  const removeFromWaitingList = (id) => {
    setWaitingList(prev => prev.filter(entry => entry.id !== id));
  };

  // Audit operations
  const addAuditLog = (logData) => {
    const newLog = {
      ...logData,
      id: generateId()
    };
    setAuditLogs(prev => [...prev, newLog]);
  };

  const value = {
    currentUser,
    userRole,
    setUserRole,
    patients,
    doctors,
    appointments,
    medicines,
    invoices,
    staff,
    notifications,
    services,
    communicationLogs,
    waitingList,
    auditLogs,
    activeSection,
    setActiveSection,
    addPatient,
    updatePatient,
    deletePatient,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markNotificationRead,
    addNotification,
    addCommunicationLog,
    addToWaitingList,
    updateWaitingListEntry,
    removeFromWaitingList,
    addAuditLog
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
