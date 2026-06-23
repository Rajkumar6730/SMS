// src/services/studentService.js
import API from './api';

/**
 * Extract a user‑friendly error message from an API error.
 * @param {any} error – Axios error object.
 * @returns {string} – Human‑readable error message.
 */
const getErrorMessage = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code outside 2xx
    return error.response.data?.message || error.response.data?.error || 'Server error.';
  } else if (error.request) {
    // The request was made but no response received
    return 'Network error – please check your connection.';
  } else {
    // Something happened in setting up the request
    return error.message || 'Unknown error occurred.';
  }
};

// ----------------------
// Student CRUD Operations
// ----------------------

/**
 * Get all students.
 * @param {Object} params – Optional query parameters (page, limit, filters).
 * @returns {Promise<Array>} – Array of student objects.
 */
export const getStudents = async (params = {}) => {
  try {
    const response = await API.get('/students', { params });
    return response.data; // Expected: array of students (or paginated object)
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[getStudents] Error:', message);
    throw new Error(message);
  }
};

/**
 * Get a single student by ID.
 * @param {string|number} id – Student ID.
 * @returns {Promise<Object>} – Student object.
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
 * @param {Object} studentData – Student data (matches your model).
 * @returns {Promise<Object>} – Created student object.
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
 * @param {string|number} id – Student ID.
 * @param {Object} studentData – Updated data.
 * @returns {Promise<Object>} – Updated student object.
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
 * @param {string|number} id – Student ID.
 * @returns {Promise<void>}
 */
export const deleteStudent = async (id) => {
  try {
    await API.delete(`/students/${id}`);
    // No content to return; operation succeeded.
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
 * @returns {Promise<Object>} – { message: "Deleted X students." }
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
// Optional: Additional Helpers (CSV Export/Import)
// ----------------------

/**
 * Export students as CSV (using the backend endpoint if you have one).
 * @returns {Promise<Blob>} – CSV file blob.
 */
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

/**
 * Import students from CSV (upload file).
 * @param {FormData} formData – Contains the CSV file.
 * @returns {Promise<Object>} – Import summary.
 */
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