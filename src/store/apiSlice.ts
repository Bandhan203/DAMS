import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API base URL
const API_BASE_URL = 'http://localhost:3001/api'; // Adjust to your backend URL

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const state = getState() as any;
      const token = state.auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
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
