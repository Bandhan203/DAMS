
import React, { useState } from 'react';
import { UserCircle, LogOut, ChevronDown, Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-xl border-b border-blue-200/30 shadow-xl flex items-center justify-between h-16 px-6 transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        {/* Left: Sidebar toggle, logo, search bar */}
        <div className="flex items-center gap-6">
          <button
            onClick={onToggleSidebar}
            className="text-blue-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 rounded-xl p-3 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 hover:scale-105"
            title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            <span className="sr-only">Toggle Sidebar</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
          {/* Search bar */}
          <div className="ml-2 w-80">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search doctors, patients, appointments..."
                className="pl-12 pr-4 py-3 w-full border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 focus:shadow-lg focus:shadow-blue-200/50"
              />
            </div>
          </div>
        </div>
        {/* Right: Notification, user info/sign in */}
        <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 hover:scale-105 group">
          <Bell className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
          {/* Notification dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></span>
        </button>
        {/* User Info or Sign In */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 focus:outline-none border border-transparent hover:border-blue-200/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 hover:scale-105 group"
            >
              <div className="p-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-800 font-semibold group-hover:text-blue-700 transition-colors duration-300">{user.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-180" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-blue-200/30 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-blue-100/50">
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-lg mt-1 inline-block">{user.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-b-xl transition-all duration-300 hover:shadow-lg group"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" /> 
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      </header>
    </>
  );
};

export default Header;
