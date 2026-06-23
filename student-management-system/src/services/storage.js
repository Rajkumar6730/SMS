// src/utils/storage.js

// ========== Generic storage helpers ==========
export const loadData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Failed to load data for key "${key}":`, error);
    return null;
  }
};

export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save data for key "${key}":`, error);
  }
};

// ========== Student‑specific helpers (using generic ones) ==========
const STUDENT_STORAGE_KEY = 'students';

export const loadStudents = () => {
  return loadData(STUDENT_STORAGE_KEY) || [];
};

export const saveStudents = (students) => {
  saveData(STUDENT_STORAGE_KEY, students);
};