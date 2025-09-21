import React from 'react';
import { useApiStatus } from '../../services/ApiService';

const ApiStatusIndicator = () => {
  const { isOnline, backendStatus, lastChecked } = useApiStatus();

  const getStatusColor = () => {
    if (!isOnline) return 'bg-red-500';
    if (backendStatus === 'online') return 'bg-green-500';
    if (backendStatus === 'offline') return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (backendStatus === 'online') return 'Online';
    if (backendStatus === 'offline') return 'Mock Data';
    return 'Checking...';
  };

  const getStatusMessage = () => {
    if (!isOnline) return 'No internet connection - using cached data';
    if (backendStatus === 'online') return 'Connected to server';
    if (backendStatus === 'offline') return 'Server unavailable - using mock data';
    return 'Checking server status...';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border p-3 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
          <span className="text-sm font-medium text-gray-900">{getStatusText()}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{getStatusMessage()}</p>
        {lastChecked && (
          <p className="text-xs text-gray-400 mt-1">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApiStatusIndicator;
