// API Configuration and utilities
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API Error handling
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
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
  get: <T = any>(endpoint: string, params?: PaginationParams) => {
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
    
    return apiRequest<T>(url, { method: 'GET' });
  },

  post: <T = any>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = any>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
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
    get: (id: string) => `/patients/${id}`,
    update: (id: string) => `/patients/${id}`,
    delete: (id: string) => `/patients/${id}`,
  },
  
  // Doctors
  doctors: {
    list: '/doctors',
    create: '/doctors',
    get: (id: string) => `/doctors/${id}`,
    update: (id: string) => `/doctors/${id}`,
    delete: (id: string) => `/doctors/${id}`,
    schedule: (id: string) => `/doctors/${id}/schedule`,
  },
  
  // Appointments
  appointments: {
    list: '/appointments',
    create: '/appointments',
    get: (id: string) => `/appointments/${id}`,
    update: (id: string) => `/appointments/${id}`,
    delete: (id: string) => `/appointments/${id}`,
    byDoctor: (doctorId: string) => `/appointments/doctor/${doctorId}`,
    byPatient: (patientId: string) => `/appointments/patient/${patientId}`,
  },
  
  // Medicines/Inventory
  medicines: {
    list: '/medicines',
    create: '/medicines',
    get: (id: string) => `/medicines/${id}`,
    update: (id: string) => `/medicines/${id}`,
    delete: (id: string) => `/medicines/${id}`,
    lowStock: '/medicines/low-stock',
  },
  
  // Staff
  staff: {
    list: '/staff',
    create: '/staff',
    get: (id: string) => `/staff/${id}`,
    update: (id: string) => `/staff/${id}`,
    delete: (id: string) => `/staff/${id}`,
  },
  
  // Billing
  billing: {
    list: '/billings',
    create: '/billings',
    get: (id: string) => `/billings/${id}`,
    update: (id: string) => `/billings/${id}`,
    delete: (id: string) => `/billings/${id}`,
    invoice: (id: string) => `/billings/${id}/invoice`,
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
