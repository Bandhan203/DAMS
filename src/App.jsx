// This project includes search and management for doctor, patient, and medicine.
import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ApiStatusProvider } from './services/ApiService';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/landing/Landing';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/DashboardNew';
import DoctorPage from './components/doctors/DoctorPage';
import AppointmentList from './components/appointments/AppointmentList';
import AppointmentManagement from './components/appointments/AppointmentManagement';
import PatientList from './components/patients/PatientList';
import PatientManagement from './components/patients/PatientManagement';
import DoctorList from './components/doctors/DoctorList';
import StaffList from './components/staff/StaffList';
import InventoryList from './components/inventory/InventoryList';
import InventoryManagement from './components/inventory/InventoryManagement';
import BillingManagement from './components/billing/BillingManagement';
import ReportsAnalytics from './components/reports/ReportsList';
import CommunicationCenter from './components/communications/CommunicationCenter';
import WaitingListManager from './components/waiting-list/WaitingListManager';
import NotificationCenter from './components/notifications/NotificationCenter';
import AuditLogs from './components/audit/AuditLogs';
import Settings from './components/settings/Settings';
import DoctorDashboard from './components/doctors/DoctorDashboard';
import DoctorProfile from './components/doctors/DoctorProfile';
import DoctorSchedule from './components/doctors/DoctorSchedule';
import DoctorPerformance from './components/doctors/DoctorPerformance';
// New module imports
import PharmacyManagement from './components/pharmacy/PharmacyManagement';
import LaboratoryManagement from './components/laboratory/LaboratoryManagement';
import AdmissionManagement from './components/admissions/AdmissionManagement';
import EmergencyManagement from './components/emergency/EmergencyManagement';
import PrescriptionManagement from './components/prescriptions/PrescriptionManagement';


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

const AppContent = () => {
  return (
    <Routes>
      {/* Public routes (no sidebar/header) */}
      <Route path="/" element={<Navigate to="/landing" replace />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected app routes (with sidebar/header) */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute><DashboardLayout><AppointmentManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><DashboardLayout><PatientManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctors" element={<ProtectedRoute><DashboardLayout><DoctorPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute><DashboardLayout><StaffList /></DashboardLayout></ProtectedRoute>} />
      <Route path="/pharmacy" element={<ProtectedRoute><DashboardLayout><PharmacyManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/laboratory" element={<ProtectedRoute><DashboardLayout><LaboratoryManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admissions" element={<ProtectedRoute><DashboardLayout><AdmissionManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/emergency" element={<ProtectedRoute><DashboardLayout><EmergencyManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/prescriptions" element={<ProtectedRoute><DashboardLayout><PrescriptionManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><DashboardLayout><InventoryManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><DashboardLayout><BillingManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><DashboardLayout><ReportsAnalytics /></DashboardLayout></ProtectedRoute>} />
      <Route path="/communications" element={<ProtectedRoute><DashboardLayout><CommunicationCenter /></DashboardLayout></ProtectedRoute>} />
      <Route path="/waiting-list" element={<ProtectedRoute><DashboardLayout><WaitingListManager /></DashboardLayout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><DashboardLayout><NotificationCenter /></DashboardLayout></ProtectedRoute>} />
      <Route path="/audit" element={<ProtectedRoute><DashboardLayout><AuditLogs /></DashboardLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
      
      {/* Doctor routes */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute><DashboardLayout><DoctorDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctor/schedule" element={<ProtectedRoute><DashboardLayout><DoctorSchedule /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctor/appointments" element={<ProtectedRoute><DashboardLayout><AppointmentList /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctor/patients" element={<ProtectedRoute><DashboardLayout><PatientList /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctor/performance" element={<ProtectedRoute><DashboardLayout><DoctorPerformance /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctor/profile" element={<ProtectedRoute><DashboardLayout><DoctorProfile /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctor/communications" element={<ProtectedRoute><DashboardLayout><CommunicationCenter /></DashboardLayout></ProtectedRoute>} />
      <Route path="/doctor/notifications" element={<ProtectedRoute><DashboardLayout><NotificationCenter /></DashboardLayout></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};


function App() {
  return (
    <ErrorBoundary>
      <ApiStatusProvider>
        <AppProvider>
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>
        </AppProvider>
      </ApiStatusProvider>
    </ErrorBoundary>
  );
}

export default App;
