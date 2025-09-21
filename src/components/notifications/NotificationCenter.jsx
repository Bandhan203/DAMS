import React, { useState } from 'react';
import { 
  Calendar, 
  AlertTriangle, 
  Banknote, 
  CheckCircle, 
  Trash2,
  Clock,
  AlertCircle,
  Bell,
  Search,
  MoreVertical,
  Eye,
  Star,
  Zap,
  Activity,
  Layers,
  Shield,
  Users,
  MessageSquare
} from 'lucide-react';

const NotificationCenter = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      icon: Calendar,
      title: 'Upcoming Appointment',
      message: 'Dr. Sarah Khan has an appointment with Mr. Ahmed in 30 minutes',
      dateTime: 'Aug 19, 2025 2:30 PM',
      priority: 'High',
      status: 'Urgent',
      isRead: false,
      category: 'appointment',
      avatar: '👨‍⚕️',
      actionRequired: true,
      starred: false,
      tags: ['appointment', 'urgent']
    },
    {
      id: 2,
      type: 'inventory',
      icon: AlertTriangle,
      title: 'Critical Stock Alert',
      message: 'Paracetamol stock has reached minimum threshold (5 units remaining)',
      dateTime: 'Aug 19, 2025 1:45 PM',
      priority: 'High',
      status: 'Critical',
      isRead: false,
      category: 'inventory',
      avatar: '💊',
      actionRequired: true,
      starred: true,
      tags: ['inventory', 'critical', 'reorder']
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setIsLoading(true);
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      setIsLoading(false);
    }, 800);
  };

  // Additional handler functions for missing buttons
  const handleMoreOptions = (notificationId) => {
    console.log(`More options clicked for notification: ${notificationId}`);
    // Could open a dropdown menu with additional options like:
    // - Archive notification
    // - Snooze notification
    // - Mark as important
    // - Share notification
  };

  const handleStarNotification = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, starred: !notification.starred }
          : notification
      )
    );
    console.log(`Star toggled for notification: ${notificationId}`);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    console.log('Search cleared');
  };

  const handlePriorityFilter = (priority) => {
    setFilterPriority(priority);
    console.log(`Priority filter changed to: ${priority}`);
  };

  const handleArchiveNotification = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, archived: true }
          : notification
      )
    );
    console.log(`Notification archived: ${notificationId}`);
  };

  const handleSnoozeNotification = (notificationId) => {
    console.log(`Notification snoozed: ${notificationId}`);
    // Could implement snooze functionality
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    return matchesSearch && matchesPriority && !notification.archived;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-xl">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  Notification Center
                </h1>
                <p className="text-gray-600 text-lg font-medium">Manage all your clinic notifications with ease</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-3 rounded-2xl bg-white/80 text-gray-600 hover:bg-gray-100/80 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Priority Filter */}
              <div className="relative">
                <select 
                  value={filterPriority}
                  onChange={(e) => handlePriorityFilter(e.target.value)}
                  className="appearance-none bg-white/80 border border-white/30 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
                >
                  <option value="all">All Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
              
              <button
                disabled={isLoading}
                onClick={markAllAsRead}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {isLoading ? 'Processing...' : 'Mark All Read'}
                </div>
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          {showSearch && (
            <div className="mt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search notifications..."
                    className="w-full pl-12 pr-6 py-4 bg-white/90 border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 shadow-lg text-gray-700 font-medium"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notification List */}
        <div className="space-y-6">
          {filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            
            return (
              <div 
                key={notification.id}
                className="bg-white/80 backdrop-blur-2xl rounded-3xl border-2 border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-6 flex-1">
                    {/* Icon */}
                    <div className="relative">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-xl">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 text-2xl">
                        {notification.avatar}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="font-black text-xl text-gray-900">
                          {notification.title}
                        </h3>
                        
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
                          {notification.priority}
                        </span>
                        
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                          {notification.status}
                        </span>
                        
                        {!notification.isRead && (
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      
                      <p className="text-lg leading-relaxed mb-4 text-gray-800 font-medium">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {notification.dateTime}
                        </span>
                        {notification.actionRequired && (
                          <span className="flex items-center gap-1 text-purple-600 font-medium">
                            <Activity className="w-4 h-4" />
                            Requires Action
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3 ml-4">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-3 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 hover:scale-110"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300 hover:scale-110"
                      title="Delete notification"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <button 
                      onClick={() => handleArchiveNotification(notification.id)}
                      className="p-3 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all duration-300 hover:scale-110"
                      title="Archive notification"
                    >
                      <Activity className="w-5 h-5" />
                    </button>

                    <button 
                      onClick={() => handleStarNotification(notification.id)}
                      className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                        notification.starred 
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={notification.starred ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-5 h-5 ${notification.starred ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button 
                      onClick={() => handleMoreOptions(notification.id)}
                      className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                      title="More options"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-16 text-center">
            <div className="bg-gradient-to-r from-gray-600 to-slate-600 p-6 rounded-3xl shadow-xl mx-auto w-24 h-24 flex items-center justify-center mb-6">
              <Bell className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-700 mb-4">No Notifications Found</h3>
            <p className="text-gray-500 text-lg mb-6">
              {searchTerm 
                ? 'No notifications match your search criteria.' 
                : 'You\'re all caught up! No new notifications at the moment.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;