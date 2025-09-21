
import { useApp } from '../../context/AppContext';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Stethoscope, UserCog, Package, Banknote, BarChart2, Bell, Settings,
  Pill, TestTube, Bed, AlertTriangle, FileText
} from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'doctors', label: 'Doctors', icon: Stethoscope, path: '/doctors' },
  { key: 'patients', label: 'Patients', icon: Users, path: '/patients' },
  { key: 'appointments', label: 'Appointments', icon: Calendar, path: '/appointments' },
  { key: 'pharmacy', label: 'Pharmacy', icon: Pill, path: '/pharmacy' },
  { key: 'laboratory', label: 'Laboratory', icon: TestTube, path: '/laboratory' },
  { key: 'admissions', label: 'Admissions', icon: Bed, path: '/admissions' },
  { key: 'emergency', label: 'Emergency Dept', icon: AlertTriangle, path: '/emergency' },
  { key: 'prescriptions', label: 'Prescriptions', icon: FileText, path: '/prescriptions' },
  { key: 'inventory', label: 'Inventory', icon: Package, path: '/inventory' },
  { key: 'billing', label: 'Billing', icon: Banknote, path: '/billing' },
  { key: 'reports', label: 'Reports', icon: BarChart2, path: '/reports' },
  { key: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = ({ isOpen = true }) => {
  const { activeSection, setActiveSection, userRole } = useApp();

  // Doctor role: show only relevant sections
  const filteredNavItems = userRole === 'doctor'
    ? navItems.filter(item => [
        'dashboard', 'appointments', 'patients', 'pharmacy', 'laboratory', 
        'prescriptions', 'emergency', 'notifications', 'settings'
      ].includes(item.key))
    : navItems;

  return (
    <aside
      className={`fixed left-0 h-full bg-gradient-to-b from-white/95 to-blue-50/95 backdrop-blur-xl border-r border-blue-200/30 shadow-2xl z-30 transition-all duration-500 ${isOpen ? 'w-64' : 'w-16'} flex flex-col`}
    >
      {/* Brand Section */}
      <div className={`${isOpen ? 'px-6' : 'px-2'} border-b border-gradient-to-r from-transparent via-blue-200/30 to-transparent relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-t-xl"></div>
        <Link 
          to="/landing"
          className="flex flex-col items-center justify-center py-8 hover:bg-blue-50/30 rounded-xl transition-all duration-300 group relative z-10"
          title="Go to Landing Page"
        >
          <span className="flex items-center gap-3 text-blue-700 font-bold text-xl tracking-tight group-hover:scale-105 transition-transform duration-300">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg group-hover:shadow-xl group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                <path d="M2 12h2l2 5 4-9 3 7h5"/>
                <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/>
              </svg>
            </div>
            {isOpen && (
              <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-blue-700 transition-all duration-300">
                MediCare <span className="text-blue-500 group-hover:text-blue-600">Pro</span>
              </span>
            )}
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {filteredNavItems.map(({ key, label, icon: Icon, path }) => (
          <NavLink
            key={key}
            to={path}
            title={label}
            end={path === '/dashboard'}
            onClick={() => setActiveSection(key)}
            className={({ isActive }) =>
              `group flex items-center w-full px-4 py-3.5 rounded-xl transition-all duration-300 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-100/50 hover:scale-[1.02] focus:outline-none transform ${
                isActive ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-semibold shadow-lg shadow-blue-100/50 scale-[1.02]' : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg' 
                    : 'group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white group-hover:shadow-lg'
                }`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                </div>
                {isOpen && (
                  <span className="font-medium ml-3 transition-all duration-300 group-hover:translate-x-1">
                    {label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-blue-200/30 text-xs text-gray-500 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/30 to-transparent"></div>
        {isOpen && (
          <span className="relative z-10 font-medium">
            &copy; {new Date().getFullYear()} MediCare Pro
          </span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
