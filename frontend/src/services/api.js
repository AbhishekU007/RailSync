import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const getUserById = (id) => api.get(`/users/${id}`);

// Train APIs
export const getAllTrains = () => api.get('/trains');
export const getTrainById = (id) => api.get(`/trains/${id}`);
export const searchTrains = (source, destination, date, travelClass) => 
  api.get('/trains/search', { params: { source, destination, date, class: travelClass } });
export const addTrain = (trainData) => api.post('/trains', trainData);
export const updateTrain = (id, trainData) => api.put(`/trains/${id}`, trainData);
export const deleteTrain = (id) => api.delete(`/trains/${id}`);

// Booking APIs
export const createBooking = (bookingData, userId, trainId) => 
  api.post('/bookings', bookingData, { params: { userId, trainId } });
export const getUserBookings = (userId) => api.get(`/bookings/user/${userId}`);
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);
export const getAllBookings = () => api.get('/bookings');

export default api;