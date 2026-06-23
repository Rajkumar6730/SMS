// src/services/api.js
import axios from 'axios';

// Create axios instance with base URL and timeout
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15000, // 15 seconds – adjust as needed
});

// ---- Request Interceptor ----
// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request configuration errors
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ---- Response Interceptor ----
// Handle 401 Unauthorized globally
API.interceptors.response.use(
  (response) => {
    // Any status code within 2xx triggers this
    return response;
  },
  (error) => {
    // Check if we have a response with status 401
    if (error.response && error.response.status === 401) {
      // Token expired, invalid, or missing – logout and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // if you store user separately
      // Redirect to login page, preserving the current location for redirect back
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    // Optionally handle other status codes (404, 500, etc.)
    return Promise.reject(error);
  }
);

export default API;