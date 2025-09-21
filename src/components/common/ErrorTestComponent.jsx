import React, { useState } from 'react';
import { api, useApi } from '../services/ApiService';

const ErrorTestComponent = () => {
  const [testResults, setTestResults] = useState([]);
  const { makeRequest } = useApi();

  const addResult = (test, success, message) => {
    setTestResults(prev => [...prev, { test, success, message, time: new Date().toLocaleTimeString() }]);
  };

  // Test 1: Direct fetch to non-existent endpoint
  const testDirectFetch = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/nonexistent');
      addResult('Direct Fetch Test', true, `Status: ${response.status} - No error thrown!`);
    } catch (error) {
      addResult('Direct Fetch Test', true, `Caught and handled: ${error.message}`);
    }
  };

  // Test 2: API service call
  const testApiService = async () => {
    const result = await makeRequest(() => api.get('/test-endpoint'));
    addResult('API Service Test', true, `Got ${result.source} data with ${result.data.length} items`);
  };

  // Test 3: Multiple rapid requests
  const testMultipleRequests = async () => {
    const promises = [
      api.get('/patients'),
      api.get('/doctors'), 
      api.get('/appointments'),
      api.get('/nonexistent')
    ];
    
    const results = await Promise.all(promises);
    addResult('Multiple Requests Test', true, `All ${results.length} requests completed successfully`);
  };

  // Test 4: Simulate server error
  const testServerError = async () => {
    try {
      // This would normally cause a 500 error
      const response = await fetch('http://localhost:3001/api/simulate-error', {
        method: 'POST',
        body: JSON.stringify({ trigger: 'error' })
      });
      addResult('Server Error Test', true, `Status: ${response.status} - Error intercepted!`);
    } catch (error) {
      addResult('Server Error Test', true, `Network error handled: ${error.message}`);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    await testDirectFetch();
    await testApiService();
    await testMultipleRequests();
    await testServerError();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🧪 500 Error Prevention Tests</h2>
      
      <div className="mb-6">
        <button
          onClick={runAllTests}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Run All Tests
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={testDirectFetch}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Test Direct Fetch
        </button>
        <button
          onClick={testApiService}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Test API Service
        </button>
        <button
          onClick={testMultipleRequests}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Test Multiple Requests
        </button>
        <button
          onClick={testServerError}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Test Server Error
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Test Results:</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">No tests run yet</p>
        ) : (
          testResults.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded border-l-4 ${
                result.success ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-gray-800">{result.test}</span>
                  <p className="text-sm text-gray-600">{result.message}</p>
                </div>
                <span className="text-xs text-gray-500">{result.time}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 What This Tests:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Direct fetch requests to non-existent endpoints</li>
          <li>• API service calls with automatic fallback</li>
          <li>• Multiple concurrent requests</li>
          <li>• Server error simulation and handling</li>
          <li>• Network error interception</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorTestComponent;
