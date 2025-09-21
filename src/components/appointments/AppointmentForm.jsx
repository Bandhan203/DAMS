import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  UserCheck,
  FileText,
  AlertCircle,
  Save,
  X,
  Stethoscope,
  Activity
} from 'lucide-react';

const AppointmentForm = ({ appointmentId, onClose }) => {
  const { appointments, patients, doctors, addAppointment, updateAppointment } = useApp();
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    duration: 30,
    type: 'consultation',
    symptoms: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointmentId) {
      const appointment = appointments.find(a => a.id === appointmentId);
      if (appointment) {
        setFormData({
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          date: appointment.date,
          time: appointment.time,
          duration: appointment.duration,
          type: appointment.type,
          symptoms: appointment.symptoms || '',
          notes: appointment.notes || ''
        });
      }
    }
  }, [appointmentId, appointments]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.doctorId) newErrors.doctorId = 'Doctor is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.duration < 15) newErrors.duration = 'Duration must be at least 15 minutes';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (appointmentId) {
      updateAppointment(appointmentId, formData);
    } else {
      addAppointment({
        ...formData,
        status: 'scheduled'
      });
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-blue-200/30">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
            {appointmentId ? 'Edit Appointment' : 'Schedule New Appointment'}
          </h2>
          <p className="text-gray-600 mt-2">Fill in the details to schedule or update an appointment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <label htmlFor="patientId" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4 text-blue-600" />
              Patient *
            </label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 ${
                errors.patientId ? 'border-red-300' : 'border-blue-200/50'
              }`}
            >
              <option value="">Select a patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName} - {patient.phone}
                </option>
              ))}
            </select>
            {errors.patientId && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.patientId}
              </div>
            )}
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2">
            <label htmlFor="doctorId" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              Doctor *
            </label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 ${
                errors.doctorId ? 'border-red-300' : 'border-blue-200/50'
              }`}
            >
              <option value="">Select a doctor</option>
              {doctors.filter(doctor => doctor.isAvailable).map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.doctorId}
              </div>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-green-600" />
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={format(new Date(), 'yyyy-MM-dd')}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 ${
                errors.date ? 'border-red-300' : 'border-blue-200/50'
              }`}
            />
            {errors.date && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.date}
              </div>
            )}
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4 text-purple-600" />
              Time *
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 ${
                errors.time ? 'border-red-300' : 'border-blue-200/50'
              }`}
            />
            {errors.time && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.time}
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label htmlFor="duration" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Activity className="w-4 h-4 text-yellow-600" />
              Duration (minutes) *
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 ${
                errors.duration ? 'border-red-300' : 'border-blue-200/50'
              }`}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
            {errors.duration && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.duration}
              </div>
            )}
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              Appointment Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30"
            >
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="emergency">Emergency</option>
              <option value="routine-checkup">Routine Checkup</option>
            </select>
          </div>
        </div>

        {/* Symptoms */}
        <div className="space-y-3">
          <label htmlFor="symptoms" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Activity className="w-4 h-4 text-orange-600" />
            Symptoms
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the patient's symptoms in detail..."
            className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 resize-none"
          />
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <label htmlFor="notes" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FileText className="w-4 h-4 text-teal-600" />
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Additional notes, instructions, or special requirements..."
            className="w-full px-4 py-3 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/30 resize-none"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-blue-100/50">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:shadow-lg hover:shadow-gray-200/50 hover:scale-105 transition-all duration-300 font-semibold"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300 font-semibold"
          >
            <Save className="w-4 h-4" />
            {appointmentId ? 'Update Appointment' : 'Schedule Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
