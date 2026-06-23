// src/utils/constants.js

export const STATUS_OPTIONS = ['Active', 'Near Completion', 'Graduated'];
// Admin credentials
export const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
};

// Storage keys
export const STORAGE_KEYS = {
  STUDENTS: 'students',
  AUTH: 'auth',
  DEPARTMENTS: 'departments',
  SETTINGS: 'settings'
};

// Dropdown options
export const DEPARTMENTS = [
  'Computer Science',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'computer science and Data Science',
  'computer science and Artificial Intelligence',
  'computer science and Cyber Security',
  'computer science and Internet of Things',
  'computer science and Cloud Computing',
  'computer science and Software Engineering',
  'Information Technology and Data Science',
  'Information Technology and Artificial Intelligence',
  'Information Technology and Cyber Security',
  'Information Technology and Internet of Things',
  'Information Technology and Software Engineering',
  //B pharmacy
  'Pharmacy',
  'Pharmacy and Data Science',
  'Pharmacy and Artificial Intelligence',
  'Pharmacy and medical science',
  'B pharmacy and Biotechnology',
  'B pharmacy and Microbiology',
  'B pharmacy and Biochemistry',
  'B pharmacy and Pharmacology',
  'B pharmacy and Pharmaceutical Chemistry',
  'B pharmacy and Pharmacognosy',
  'B pharmacy and Pharmacotherapy',
  'B pharmacy and dentistry',
  'B pharmacy and nursing',
  'B pharmacy and physiotherapy',
  'B pharmacy and occupational therapy',
  'B pharmacy and caridiology',
  'B pharmacy and neurology',
  'B pharmacy and oncology',
  'B pharmacy and psychiatry',
  'B pharmacy and dermatology',
  'B pharmacy and endocrinology',
  'B pharmacy and gastroenterology',
  'B pharmacy and nephrology',
  'B pharmacy and pulmonology',
  'B pharmacy and rheumatology',
  'B pharmacy and urology',
];

export const COURSES = [
  'B.Tech CSE',
  'B.Tech EEE',
  'B.Tech CSD',
  'B.Tech CSM',
  'B.Tech CSI',
  'B.Tech CSE/CYBER SECURITY',
  'B.Tech CSE/ CLOUD COMPUTING',
  'B.Tech EEE',
  'B.Tech IT',
  'B.Tech ECE',
  'B.Tech ME',
  'B.Tech Civil',
  'B.Tech EE',
  'M.Tech CSE',
  'M.Tech IT',
  'M.Tech ECE',
  'M.Tech ME',
  'M.Tech Civil',
  'M.Tech EE',
  'MCA',
  'B Pharmacy',
  'M Pharmacy', 
  'Arts and Science',
];

export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
export const YEAR_OPTIONS = [1, 2, 3, 4, 5, 6];
export const COURSE_DURATION_OPTIONS = [2, 3, 4, 5, 6];