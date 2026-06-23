// src/services/studentService.js
import API from './api';

/**
 * Extract a user‑friendly error message from an API error.
 */
const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data?.message || error.response.data?.error || 'Server error.';
  } else if (error.request) {
    return 'Network error – please check your connection.';
  } else {
    return error.message || 'Unknown error occurred.';
  }
};

// ----------------------
// Student CRUD Operations
// ----------------------

/**
 * Get all students with pagination and filters.
 * @param {number} page – Page number (default: 1).
 * @param {number} limit – Items per page (default: 20).
 * @param {Object} filters – Additional filters (department, status, etc.).
 * @returns {Promise<Object>} – { students, total, page, totalPages }
 */
export const getStudents = async (page = 1, limit = 20, filters = {}) => {
  try {
    const response = await API.get('/students', {
      params: { page, limit, ...filters }
    });
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[getStudents] Error:', message);
    throw new Error(message);
  }
};

/**
 * Get a single student by ID.
 */
export const getStudentById = async (id) => {
  try {
    const response = await API.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`[getStudentById] Error for ID ${id}:`, message);
    throw new Error(message);
  }
};

/**
 * Create a new student.
 */
export const addStudent = async (studentData) => {
  try {
    const response = await API.post('/students', studentData);
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[addStudent] Error:', message);
    throw new Error(message);
  }
};

/**
 * Update an existing student.
 */
export const updateStudent = async (id, studentData) => {
  try {
    const response = await API.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`[updateStudent] Error for ID ${id}:`, message);
    throw new Error(message);
  }
};

/**
 * Delete a student.
 */
export const deleteStudent = async (id) => {
  try {
    await API.delete(`/students/${id}`);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`[deleteStudent] Error for ID ${id}:`, message);
    throw new Error(message);
  }
};

// ----------------------
// Bulk Delete (Clear All)
// ----------------------

/**
 * Delete ALL students from the database.
 */
export const deleteAllStudents = async () => {
  try {
    const response = await API.delete('/students/all');
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[deleteAllStudents] Error:', message);
    throw new Error(message);
  }
};

// ----------------------
// Optional: CSV Export/Import
// ----------------------

export const exportStudentsCSV = async () => {
  try {
    const response = await API.get('/students/export', { responseType: 'blob' });
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[exportStudentsCSV] Error:', message);
    throw new Error(message);
  }
};

export const importStudentsCSV = async (formData) => {
  try {
    const response = await API.post('/students/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[importStudentsCSV] Error:', message);
    throw new Error(message);
  }
};