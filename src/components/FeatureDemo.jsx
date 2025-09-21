import React from 'react';
import { useBounce, UseBounce } from '../hooks/useBounce.js';
import { useRedux, UseRedux } from '../store/hooks.js';
import { addNotification } from '../store/uiSlice.js';
import { api, useApi } from '../services/ApiService.jsx';

// Example component demonstrating all the new features
const FeatureDemo = () => {
  // Using the custom bounce hook
  const { bounce, bounceStyle, bounceClass } = useBounce({
    scale: 1.2,
    duration: 400
  });

  // Alternative way to use bounce hook
  const { bounce: bounceAlt, bounceStyle: bounceStyleAlt } = UseBounce();

  // Using Redux
  const { dispatch, selector } = useRedux();
  
  // Alternative way to use Redux
  const { dispatch: dispatchAlt, selector: selectorAlt } = UseRedux();
  
  // Using the new API service
  const { makeRequest, apiStatus } = useApi();
  
  // Get notifications from Redux store
  const notifications = selector(state => state.ui.notifications);

  // Handle button click with bounce animation
  const handleBounceClick = () => {
    bounce();
    dispatch(addNotification({
      type: 'success',
      message: 'Bounce animation triggered!'
    }));
  };

  // Example API call with new service
  const handleApiCall = async () => {
    const result = await makeRequest(() => api.get('/patients'));
    
    dispatch(addNotification({
      type: result.source === 'mock' ? 'info' : 'success',
      message: `Fetched ${result.data?.length || 0} patients ${result.source === 'mock' ? '(mock data)' : '(from server)'}`
    }));
  };

  // Alternative API call using new service
  const handleAltApiCall = async () => {
    const result = await makeRequest(() => api.get('/doctors'));
    
    dispatchAlt(addNotification({
      type: result.source === 'mock' ? 'info' : 'success',
      message: `Fetched ${result.data?.length || 0} doctors ${result.source === 'mock' ? '(mock data)' : '(from server)'}`
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Feature Demo</h2>
      
      {/* Bounce Animation Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Bounce Animation (useBounce)</h3>
        <div className="flex space-x-4">
          <button
            onClick={handleBounceClick}
            style={bounceStyle}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Click for bounce (Style)
          </button>
          
          <button
            onClick={bounceAlt}
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ${bounceClass}`}
            style={bounceStyleAlt}
          >
            Click for bounce (Class)
          </button>
        </div>
      </div>

      {/* Redux Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Redux State Management</h3>
        <div className="bg-gray-100 p-4 rounded">
          <p className="font-medium">Notifications in store: {notifications.length}</p>
          {notifications.slice(-3).map(notification => (
            <div
              key={notification.id}
              className={`mt-2 p-2 rounded text-sm ${
                notification.type === 'success' ? 'bg-green-200 text-green-800' :
                notification.type === 'error' ? 'bg-red-200 text-red-800' :
                notification.type === 'info' ? 'bg-blue-200 text-blue-800' :
                'bg-yellow-200 text-yellow-800'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </div>

      {/* API Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">API Integration</h3>
        <div className="flex space-x-4">
          <button
            onClick={handleApiCall}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Test API (Patients)
          </button>
          
          <button
            onClick={handleAltApiCall}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            Test API (Doctors)
          </button>
        </div>
      </div>

      {/* Available Features Summary */}
      <div className="bg-blue-50 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">✅ Now Available:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>UseBounce / useBounce</strong> - Custom bounce animation hook</li>
          <li><strong>UseRedux / useRedux</strong> - Typed Redux hooks</li>
          <li><strong>Api / api</strong> - API utility functions</li>
          <li><strong>ApiSlice / APiSlice</strong> - RTK Query API slice</li>
          <li><strong>Redux Store</strong> - Complete state management setup</li>
          <li><strong>Auth Slice</strong> - Authentication state management</li>
          <li><strong>UI Slice</strong> - UI state management (notifications, modals, etc.)</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureDemo;
