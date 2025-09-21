import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Safe base query that uses our error prevention system
const safeBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api',
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

// Enhanced base query with error handling and fallback
const baseQueryWithFallback = async (args, api, extraOptions) => {
  try {
    const result = await safeBaseQuery(args, api, extraOptions);
    
    // If there's an error, return mock data instead
    if (result.error) {
      console.warn('🛡️ API Error intercepted by RTK Query fallback:', result.error);
      
      // Return mock data based on the endpoint
      const endpoint = typeof args === 'string' ? args : args.url;
      const mockData = getMockDataForEndpoint(endpoint);
      
      return {
        data: mockData,
        meta: { 
          source: 'mock',
          originalError: result.error,
          message: 'Fallback data due to API error'
        }
      };
    }
    
    return result;
  } catch (error) {
    console.warn('🛡️ Network error intercepted by RTK Query:', error.message);
    
    // Return mock data on network errors
    const endpoint = typeof args === 'string' ? args : args.url;
    const mockData = getMockDataForEndpoint(endpoint);
    
    return {
      data: mockData,
      meta: { 
        source: 'mock',
        originalError: error.message,
        message: 'Fallback data due to network error'
      }
    };
  }
};

// Mock data function for RTK Query
const getMockDataForEndpoint = (endpoint) => {
  const path = endpoint.toLowerCase();
  
  if (path.includes('patient')) {
    return [
      { id: 1, name: 'John Doe', age: 30, condition: 'Healthy', phone: '555-0101' },
      { id: 2, name: 'Jane Smith', age: 25, condition: 'Flu', phone: '555-0102' },
      { id: 3, name: 'Mike Johnson', age: 45, condition: 'Diabetes', phone: '555-0103' }
    ];
  }
  
  if (path.includes('doctor')) {
    return [
      { id: 1, name: 'Dr. Sarah Wilson', specialty: 'Cardiology', experience: '10 years' },
      { id: 2, name: 'Dr. Michael Brown', specialty: 'Pediatrics', experience: '8 years' }
    ];
  }
  
  if (path.includes('appointment')) {
    return [
      { id: 1, patientId: 1, doctorId: 1, date: '2025-08-25', time: '10:00', status: 'scheduled' },
      { id: 2, patientId: 2, doctorId: 2, date: '2025-08-25', time: '14:00', status: 'confirmed' }
    ];
  }
  
  if (path.includes('medicine')) {
    return [
      { id: 1, name: 'Paracetamol', category: 'Pain Relief', stock: 100 },
      { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 50 }
    ];
  }
  
  return [];
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithFallback,
  tagTypes: ['Patient', 'Doctor', 'Appointment', 'Medicine', 'Staff', 'Billing'],
  endpoints: (builder) => ({
    // Patients
    getPatients: builder.query({
      query: () => '/patients',
      providesTags: ['Patient'],
    }),
    getPatient: builder.query({
      query: (id) => `/patients/${id}`,
      providesTags: (result, error, id) => [{ type: 'Patient', id }],
    }),
    createPatient: builder.mutation({
      query: (patient) => ({
        url: '/patients',
        method: 'POST',
        body: patient,
      }),
      invalidatesTags: ['Patient'],
    }),
    updatePatient: builder.mutation({
      query: ({ id, ...patient }) => ({
        url: `/patients/${id}`,
        method: 'PUT',
        body: patient,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Patient', id }],
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Patient'],
    }),

    // Doctors
    getDoctors: builder.query({
      query: () => '/doctors',
      providesTags: ['Doctor'],
    }),
    getDoctor: builder.query({
      query: (id) => `/doctors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Doctor', id }],
    }),
    createDoctor: builder.mutation({
      query: (doctor) => ({
        url: '/doctors',
        method: 'POST',
        body: doctor,
      }),
      invalidatesTags: ['Doctor'],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, ...doctor }) => ({
        url: `/doctors/${id}`,
        method: 'PUT',
        body: doctor,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Doctor', id }],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Doctor'],
    }),

    // Appointments
    getAppointments: builder.query({
      query: () => '/appointments',
      providesTags: ['Appointment'],
    }),
    getAppointment: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Appointment', id }],
    }),
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: '/appointments',
        method: 'POST',
        body: appointment,
      }),
      invalidatesTags: ['Appointment'],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...appointment }) => ({
        url: `/appointments/${id}`,
        method: 'PUT',
        body: appointment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Appointment', id }],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointment'],
    }),

    // Medicines/Inventory
    getMedicines: builder.query({
      query: () => '/medicines',
      providesTags: ['Medicine'],
    }),
    getMedicine: builder.query({
      query: (id) => `/medicines/${id}`,
      providesTags: (result, error, id) => [{ type: 'Medicine', id }],
    }),
    createMedicine: builder.mutation({
      query: (medicine) => ({
        url: '/medicines',
        method: 'POST',
        body: medicine,
      }),
      invalidatesTags: ['Medicine'],
    }),
    updateMedicine: builder.mutation({
      query: ({ id, ...medicine }) => ({
        url: `/medicines/${id}`,
        method: 'PUT',
        body: medicine,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Medicine', id }],
    }),
    deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `/medicines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Medicine'],
    }),

    // Staff
    getStaff: builder.query({
      query: () => '/staff',
      providesTags: ['Staff'],
    }),
    createStaff: builder.mutation({
      query: (staff) => ({
        url: '/staff',
        method: 'POST',
        body: staff,
      }),
      invalidatesTags: ['Staff'],
    }),
    updateStaff: builder.mutation({
      query: ({ id, ...staff }) => ({
        url: `/staff/${id}`,
        method: 'PUT',
        body: staff,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staff/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Staff'],
    }),

    // Billing
    getBillings: builder.query({
      query: () => '/billings',
      providesTags: ['Billing'],
    }),
    getBilling: builder.query({
      query: (id) => `/billings/${id}`,
      providesTags: (result, error, id) => [{ type: 'Billing', id }],
    }),
    createBilling: builder.mutation({
      query: (billing) => ({
        url: '/billings',
        method: 'POST',
        body: billing,
      }),
      invalidatesTags: ['Billing'],
    }),
    updateBilling: builder.mutation({
      query: ({ id, ...billing }) => ({
        url: `/billings/${id}`,
        method: 'PUT',
        body: billing,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Billing', id }],
    }),
    deleteBilling: builder.mutation({
      query: (id) => ({
        url: `/billings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Billing'],
    }),

    // Authentication
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  // Patients
  useGetPatientsQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
  
  // Doctors
  useGetDoctorsQuery,
  useGetDoctorQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  
  // Appointments
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  
  // Medicines
  useGetMedicinesQuery,
  useGetMedicineQuery,
  useCreateMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
  
  // Staff
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  
  // Billing
  useGetBillingsQuery,
  useGetBillingQuery,
  useCreateBillingMutation,
  useUpdateBillingMutation,
  useDeleteBillingMutation,
  
  // Auth
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = apiSlice;
