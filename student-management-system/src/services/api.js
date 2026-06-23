// src/services/api.js
import axios from 'axios';

// Use environment variable for API base URL, with localhost fallback for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API_BASE_URL:', API_BASE_URL);  


// Create axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds
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
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ---- Response Interceptor ----
// Handle 401 Unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;