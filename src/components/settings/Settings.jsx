import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Settings as SettingsIcon, 
  Calendar, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Clock, 
  Mail, 
  Phone, 
  MapPin,
  Cloud,
  User,
  Database,
  Palette,
  Monitor,
  Smartphone,
  Wifi,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info,
  Star,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Settings2,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Contrast,
  Type,
  Layout,
  Layers
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [animateIn, setAnimateIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [tabTransition, setTabTransition] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    sound: true
  });
  const [settings, setSettings] = useState({
    clinicName: 'Medicare pro appointment and management system',
    phoneNumber: '+8801883844096',
    emailAddress: 'medicare@pro.com.bd',
    website: 'www.medicarepro.com.bd',
    timezone: 'Asia/Dhaka',
    language: 'English',
    address: 'Plot 456, Gulshan Avenue, Gulshan-2, Dhaka-1212, Bangladesh',
    theme: 'light',
    currency: 'BDT',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24-hour'
  });

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    // Simulate API call with enhanced feedback
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessNotification(true);
      
      // Enhanced success notification with animation
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 z-50 transform transition-all duration-500 animate-bounce-in';
      notification.innerHTML = `
        <div class="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div class="font-bold text-lg">Settings Saved!</div>
              <div class="text-sm opacity-90">All changes have been applied successfully</div>
            </div>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.transform = 'translateX(120%) scale(0.8)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 4000);
      
      setTimeout(() => setShowSuccessNotification(false), 4500);
    }, 1500);
  };

  const handleTabChange = (tabId) => {
    if (tabId !== activeTab) {
      setTabTransition(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setTabTransition(false);
      }, 150);
    }
  };

  // Additional handler functions for missing buttons
  const handlePasswordUpdate = () => {
    console.log('Password update requested');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    }, 1000);
  };

  const handleBackupData = () => {
    console.log('Data backup initiated');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Backup completed successfully');
    }, 2000);
  };

  const handleExportData = () => {
    console.log('Data export initiated');
    const exportData = {
      patients: 'Sample patient data',
      appointments: 'Sample appointment data',
      settings: settings,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clinic_data_export_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreData = () => {
    console.log('Data restore initiated');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            console.log('Data restored:', data);
          } catch (error) {
            console.error('Invalid file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleSystemUpdate = () => {
    console.log('System update check initiated');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('System is up to date');
    }, 2000);
  };

  const handleToggleSetting = (settingKey) => {
    console.log(`Toggle setting: ${settingKey}`);
    // Toggle functionality would update specific settings
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'appearance', label: 'Appearance', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { id: 'notification', label: 'Notifications', icon: Bell, color: 'from-green-500 to-emerald-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-red-500 to-orange-500' },
    { id: 'system', label: 'System', icon: Database, color: 'from-gray-500 to-slate-500' },
    { id: 'billing', label: 'Billing', icon: CreditCard, color: 'from-yellow-500 to-amber-500' }
  ];

  const timezones = [
    'Asia/Dhaka',
    'Asia/Karachi', 
    'Asia/Kolkata',
    'Asia/Dubai',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const languages = [
    'English',
    'Bengali',
    'Urdu',
    'Hindi',
    'Arabic',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese'
  ];

  const currencies = [
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      {/* Clinic Information Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-cyan-400/30 to-teal-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-3xl animate-pulse"></div>
        <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-2xl shadow-xl">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Clinic Information
              </h3>
              <p className="text-gray-600 font-medium">Basic information about your medical facility</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clinic Name */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Name *
              </label>
              <input
                type="text"
                value={settings.clinicName}
                onChange={(e) => handleInputChange('clinicName', e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl group-focus-within:bg-white/90"
                placeholder="Enter clinic name"
              />
            </div>

            {/* Phone Number */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  value={settings.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl group-focus-within:bg-white/90"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="email"
                  value={settings.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl group-focus-within:bg-white/90"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Website */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="url"
                  value={settings.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl group-focus-within:bg-white/90"
                  placeholder="Enter website URL"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6 group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clinic Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
              <textarea
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl group-focus-within:bg-white/90 resize-none"
                placeholder="Enter complete clinic address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Regional Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Timezone */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors duration-300" />
                <select
                  value={settings.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl appearance-none"
                >
                  {timezones.map(timezone => (
                    <option key={timezone} value={timezone}>{timezone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Language */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors duration-300" />
                <select
                  value={settings.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl appearance-none"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Currency */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors duration-300" />
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl appearance-none"
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-8">
      {/* Theme Settings */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            Theme & Display
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Theme Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Theme Mode</label>
              <div className="space-y-3">
                {[
                  { id: 'light', label: 'Light Mode', icon: Sun },
                  { id: 'dark', label: 'Dark Mode', icon: Moon },
                  { id: 'auto', label: 'Auto Mode', icon: Contrast }
                ].map(theme => (
                  <div key={theme.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={theme.id}
                      checked={settings.theme === theme.id}
                      onChange={(e) => handleInputChange('theme', e.target.value)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <theme.icon className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-700">{theme.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Display Settings */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Display Options</label>
              <div className="space-y-3">
                {[
                  { id: 'compact', label: 'Compact View', icon: Layout },
                  { id: 'comfortable', label: 'Comfortable View', icon: Monitor },
                  { id: 'spacious', label: 'Spacious View', icon: Layers }
                ].map(display => (
                  <div key={display.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300 cursor-pointer">
                    <input
                      type="radio"
                      name="display"
                      value={display.id}
                      className="w-4 h-4 text-purple-600"
                    />
                    <display.icon className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-700">{display.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animation Settings */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Animation & Effects</label>
              <div className="space-y-3">
                {[
                  { id: 'animations', label: 'Enable Animations' },
                  { id: 'transitions', label: 'Smooth Transitions' },
                  { id: 'shadows', label: 'Drop Shadows' },
                  { id: 'blur', label: 'Backdrop Blur' }
                ].map(effect => (
                  <div key={effect.id} className="flex items-center justify-between p-3 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300">
                    <span className="font-medium text-gray-700">{effect.label}</span>
                    <button className="p-1">
                      <ToggleRight className="w-6 h-6 text-purple-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-8">
      {/* Notification Preferences */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            Notification Preferences
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notification Types */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Notification Methods</label>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', icon: Mail, desc: 'Receive notifications via email' },
                  { key: 'sms', label: 'SMS Notifications', icon: Smartphone, desc: 'Get SMS alerts for important updates' },
                  { key: 'push', label: 'Push Notifications', icon: Bell, desc: 'Browser push notifications' },
                  { key: 'sound', label: 'Sound Alerts', icon: Volume2, desc: 'Audio notifications for events' }
                ].map(notif => (
                  <div key={notif.key} className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <notif.icon className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-700">{notif.label}</p>
                        <p className="text-sm text-gray-500">{notif.desc}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleNotificationChange(notif.key, !notifications[notif.key])}
                      className="p-1"
                    >
                      {notifications[notif.key] ? 
                        <ToggleRight className="w-6 h-6 text-green-600" /> : 
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Categories */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Notification Categories</label>
              <div className="space-y-4">
                {[
                  { id: 'appointments', label: 'Appointments', desc: 'New appointments and changes' },
                  { id: 'payments', label: 'Payments', desc: 'Payment confirmations and invoices' },
                  { id: 'patients', label: 'Patient Updates', desc: 'New patient registrations' },
                  { id: 'system', label: 'System Alerts', desc: 'System maintenance and updates' },
                  { id: 'security', label: 'Security', desc: 'Login attempts and security alerts' }
                ].map(category => (
                  <div key={category.id} className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300">
                    <div>
                      <p className="font-medium text-gray-700">{category.label}</p>
                      <p className="text-sm text-gray-500">{category.desc}</p>
                    </div>
                    <button className="p-1">
                      <ToggleRight className="w-6 h-6 text-green-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      {/* Security & Privacy */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Security & Privacy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Password & Authentication */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password & Authentication
              </h4>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-12 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <button 
                  onClick={handlePasswordUpdate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Security Settings
              </h4>
              
              <div className="space-y-4">
                {[
                  { id: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', enabled: false },
                  { id: 'loginAlerts', label: 'Login Alerts', desc: 'Get notified of new sign-ins', enabled: true },
                  { id: 'sessionTimeout', label: 'Auto Session Timeout', desc: 'Automatically log out after inactivity', enabled: true },
                  { id: 'ipRestriction', label: 'IP Address Restrictions', desc: 'Limit access to specific IP addresses', enabled: false }
                ].map(setting => (
                  <div key={setting.id} className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300">
                    <div>
                      <p className="font-medium text-gray-700">{setting.label}</p>
                      <p className="text-sm text-gray-500">{setting.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleToggleSetting(setting.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                    >
                      {setting.enabled ? 
                        <ToggleRight className="w-6 h-6 text-blue-600" /> : 
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-8">
      {/* System Configuration */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-slate-400/20 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-gray-600" />
            System Configuration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Backup & Data */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Backup & Data Management
              </h4>
              
              <div className="space-y-4">
                <button 
                  onClick={handleBackupData}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 disabled:bg-gray-100 transition-all duration-300 group disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                    <span className="font-medium text-gray-700">{isLoading ? 'Backing up...' : 'Backup Data'}</span>
                  </div>
                  <span className="text-sm text-gray-500">Last: 2 days ago</span>
                </button>

                <button 
                  onClick={handleExportData}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                    <span className="font-medium text-gray-700">Export Data</span>
                  </div>
                  <span className="text-sm text-gray-500">CSV, PDF, Excel</span>
                </button>

                <button 
                  onClick={handleSystemUpdate}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 disabled:bg-gray-100 transition-all duration-300 group disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <RefreshCw className={`w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-300 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="font-medium text-gray-700">{isLoading ? 'Checking...' : 'System Update'}</span>
                  </div>
                  <span className="text-sm text-green-600">Up to date</span>
                </button>
              </div>
            </div>

            {/* Performance & Monitoring */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Performance & Monitoring
              </h4>
              
              <div className="space-y-4">
                {[
                  { label: 'System Health', value: '98%', color: 'text-green-600' },
                  { label: 'Database Size', value: '2.4 GB', color: 'text-blue-600' },
                  { label: 'Active Sessions', value: '12', color: 'text-purple-600' },
                  { label: 'Uptime', value: '99.9%', color: 'text-green-600' }
                ].map(metric => (
                  <div key={metric.label} className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300">
                    <span className="font-medium text-gray-700">{metric.label}</span>
                    <span className={`font-bold ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-8">
      {/* Billing Configuration */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-2xl blur"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-yellow-600" />
            Billing & Payment Configuration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Settings */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800">Payment Methods</h4>
              
              <div className="space-y-4">
                {[
                  { id: 'cash', label: 'Cash Payments', enabled: true },
                  { id: 'card', label: 'Credit/Debit Cards', enabled: true },
                  { id: 'bank', label: 'Bank Transfer', enabled: true },
                  { id: 'mobile', label: 'Mobile Banking', enabled: false },
                  { id: 'insurance', label: 'Insurance Claims', enabled: true }
                ].map(method => (
                  <div key={method.id} className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300">
                    <span className="font-medium text-gray-700">{method.label}</span>
                    <button className="p-1">
                      {method.enabled ? 
                        <ToggleRight className="w-6 h-6 text-yellow-600" /> : 
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice Settings */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800">Invoice Configuration</h4>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue="5.0"
                    className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms (Days)</label>
                  <select className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl appearance-none">
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="45">45 Days</option>
                    <option value="60">60 Days</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Prefix</label>
                  <input
                    type="text"
                    defaultValue="INV-"
                    className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 bg-white/80 backdrop-blur-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'notification':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'billing':
        return renderBillingSettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-xl">
                    <SettingsIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    Settings & Preferences
                  </h1>
                  <p className="text-gray-600 text-lg font-medium">Customize your dashboard experience and manage system preferences</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      System Online
                    </span>
                    <span>Last updated: August 19, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  disabled={isLoading}
                  onClick={handleSaveChanges}
                  className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {isLoading ? 'Saving...' : 'Save All Changes'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-gray-100/60 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-3">
            <div className="flex overflow-x-auto gap-3 scrollbar-hide">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 whitespace-nowrap transform hover:scale-105 group ${
                    activeTab === tab.id
                      ? 'text-white shadow-2xl'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/60 hover:shadow-lg'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {activeTab === tab.id && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl blur opacity-75 animate-pulse`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl`}></div>
                    </>
                  )}
                  <div className="relative flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-white/20 backdrop-blur-xl' 
                        : 'bg-gray-100 group-hover:bg-white/80'
                    }`}>
                      <tab.icon className={`w-5 h-5 transition-all duration-300 ${
                        activeTab === tab.id ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                      }`} />
                    </div>
                    <span className="text-sm">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className={`transition-all duration-700 ease-in-out transform ${
          tabTransition ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
        }`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Success Notification */}
        {showSuccessNotification && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">Settings saved successfully!</span>
              <button
                onClick={() => setShowSuccessNotification(false)}
                className="ml-4 text-white/80 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateX(100%);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateX(-10%);
          }
          70% {
            transform: scale(0.9) translateX(5%);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0%);
          }
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        .group:hover .group-hover\\:animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
