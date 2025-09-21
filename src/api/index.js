// API Configuration and utilities
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// API Error handling
export class ApiError extends Error {
  constructor(statusCode, message, response) {
    super(message);
    this.statusCode = statusCode;
    this.response = response;
    this.name = 'ApiError';
  }
}

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.message || 'API request failed', data);
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
      statusCode: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'Network error',
      error
    );
  }
};

// Convenience methods
export const api = {
  get: (endpoint, params) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const url = searchParams.toString() 
      ? `${endpoint}?${searchParams.toString()}`
      : endpoint;
    
    return apiRequest(url, { method: 'GET' });
  },

  post: (endpoint, data) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: (endpoint, data) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: (endpoint, data) =>
    apiRequest(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: (endpoint) =>
    apiRequest(endpoint, { method: 'DELETE' }),
};

// Specific API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
  
  // Patients
  patients: {
    list: '/patients',
    create: '/patients',
    get: (id) => `/patients/${id}`,
    update: (id) => `/patients/${id}`,
    delete: (id) => `/patients/${id}`,
  },
  
  // Doctors
  doctors: {
    list: '/doctors',
    create: '/doctors',
    get: (id) => `/doctors/${id}`,
    update: (id) => `/doctors/${id}`,
    delete: (id) => `/doctors/${id}`,
    schedule: (id) => `/doctors/${id}/schedule`,
  },
  
  // Appointments
  appointments: {
    list: '/appointments',
    create: '/appointments',
    get: (id) => `/appointments/${id}`,
    update: (id) => `/appointments/${id}`,
    delete: (id) => `/appointments/${id}`,
    byDoctor: (doctorId) => `/appointments/doctor/${doctorId}`,
    byPatient: (patientId) => `/appointments/patient/${patientId}`,
  },
  
  // Medicines/Inventory
  medicines: {
    list: '/medicines',
    create: '/medicines',
    get: (id) => `/medicines/${id}`,
    update: (id) => `/medicines/${id}`,
    delete: (id) => `/medicines/${id}`,
    lowStock: '/medicines/low-stock',
  },
  
  // Staff
  staff: {
    list: '/staff',
    create: '/staff',
    get: (id) => `/staff/${id}`,
    update: (id) => `/staff/${id}`,
    delete: (id) => `/staff/${id}`,
  },
  
  // Billing
  billing: {
    list: '/billings',
    create: '/billings',
    get: (id) => `/billings/${id}`,
    update: (id) => `/billings/${id}`,
    delete: (id) => `/billings/${id}`,
    invoice: (id) => `/billings/${id}/invoice`,
  },
  
  // Reports
  reports: {
    dashboard: '/reports/dashboard',
    patients: '/reports/patients',
    doctors: '/reports/doctors',
    revenue: '/reports/revenue',
    appointments: '/reports/appointments',
  },
};
