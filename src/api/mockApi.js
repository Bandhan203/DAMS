// Mock API for development when backend is not available
const MOCK_DATA = {
  patients: [
    { id: 1, name: 'John Doe', age: 30, condition: 'Healthy', phone: '555-0101' },
    { id: 2, name: 'Jane Smith', age: 25, condition: 'Flu', phone: '555-0102' },
    { id: 3, name: 'Mike Johnson', age: 45, condition: 'Diabetes', phone: '555-0103' },
    { id: 4, name: 'Sarah Wilson', age: 35, condition: 'Hypertension', phone: '555-0104' }
  ],
  doctors: [
    { id: 1, name: 'Dr. Sarah Wilson', specialty: 'Cardiology', experience: '10 years' },
    { id: 2, name: 'Dr. Michael Brown', specialty: 'Pediatrics', experience: '8 years' },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Dermatology', experience: '12 years' }
  ],
  appointments: [
    { id: 1, patientId: 1, doctorId: 1, date: '2025-08-25', time: '10:00', status: 'scheduled' },
    { id: 2, patientId: 2, doctorId: 2, date: '2025-08-25', time: '14:00', status: 'confirmed' }
  ],
  medicines: [
    { id: 1, name: 'Paracetamol', category: 'Pain Relief', stock: 100 },
    { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 50 }
  ]
};

// Check if backend is available with timeout
const isBackendAvailable = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    
    const response = await fetch('http://localhost:3001/api/health', { 
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.log('Backend not available:', error.message);
    return false;
  }
};

// API wrapper that falls back to mock data
export const safeApiRequest = async (endpoint, options = {}) => {
  const backendAvailable = await isBackendAvailable();
  
  if (!backendAvailable) {
    console.warn('Backend not available, using mock data for:', endpoint);
    
    // Return mock data based on endpoint with realistic delay
    const delay = Math.random() * 300 + 100; // Random delay 100-400ms
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Route to appropriate mock data
    if (endpoint.includes('/patients')) {
      return { success: true, data: MOCK_DATA.patients };
    } else if (endpoint.includes('/doctors')) {
      return { success: true, data: MOCK_DATA.doctors };
    } else if (endpoint.includes('/appointments')) {
      return { success: true, data: MOCK_DATA.appointments };
    } else if (endpoint.includes('/medicines') || endpoint.includes('/inventory')) {
      return { success: true, data: MOCK_DATA.medicines };
    } else {
      return { success: true, data: [], message: 'Mock data not available for this endpoint' };
    }
  }
  
  try {
    // If backend is available, use the original API
    const { apiRequest } = await import('./index.js');
    return await apiRequest(endpoint, options);
  } catch (error) {
    console.error('API request failed, falling back to mock data:', error);
    // Fallback to mock data even if backend is supposedly available but fails
    const delay = Math.random() * 300 + 100;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    if (endpoint.includes('/patients')) {
      return { success: true, data: MOCK_DATA.patients };
    } else if (endpoint.includes('/doctors')) {
      return { success: true, data: MOCK_DATA.doctors };
    } else if (endpoint.includes('/appointments')) {
      return { success: true, data: MOCK_DATA.appointments };
    } else if (endpoint.includes('/medicines') || endpoint.includes('/inventory')) {
      return { success: true, data: MOCK_DATA.medicines };
    } else {
      return { success: true, data: [], message: 'Fallback mock data' };
    }
  }
};

export default safeApiRequest;
