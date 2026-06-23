// src/services/authService.js
import API from './api';
import { STORAGE_KEYS } from '../utils/constants';
import { loadData, saveData } from '../utils/storage';

export const login = async (username, password) => {
  try {
    // Use the API instance (which automatically attaches token for subsequent requests)
    const response = await API.post('/auth/login', { username, password });
    const { token, user } = response.data;

    // Save token and user data
    localStorage.setItem('token', token);
    saveData(STORAGE_KEYS.AUTH, user);

    return user;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Invalid credentials';
    throw new Error(message);
  }
};

export const logout = () => {
  // Remove token and user data
  localStorage.removeItem('token');
  localStorage.removeItem(STORAGE_KEYS.AUTH);
  // Optionally clear other keys if needed
};

export const getCurrentUser = () => {
  return loadData(STORAGE_KEYS.AUTH);
};

export const isAuthenticated = () => {
  // Check if token exists in localStorage
  return !!localStorage.getItem('token');
};

// Optional: Change password via backend (if you implement this endpoint)
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await API.put('/auth/change-password', { oldPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to change password';
  }
};