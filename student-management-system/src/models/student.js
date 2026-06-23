/**
 * Student Data Model
 * 
 * @typedef {Object} Student
 * @property {string} id - Unique identifier (auto-generated)
 * @property {string} hallTicket - Unique, required
 * @property {string} name - Required
 * @property {'Male'|'Female'|'Other'} gender
 * @property {string} dob - Date of birth (YYYY-MM-DD), cannot be future
 * @property {string} photo - Base64 or URL, optional
 * @property {string} phone - 10 digits
 * @property {string} email - Valid email format
 * @property {string} address - Residential address
 * @property {string} college - College name
 * @property {string} collegeCode - College code
 * @property {string} department - Department
 * @property {string} course - Course name
 * @property {number} courseDuration - Duration in years
 * @property {number} yearOfStudy - 1, 2, 3, 4
 * @property {string} admissionDate - YYYY-MM-DD
 * @property {string} graduationDate - Calculated (admission + duration)
 * @property {'Active'|'Near Completion'|'Graduated'} status - Computed
 * @property {string} createdAt - ISO string
 * @property {string} updatedAt - ISO string
 */

export const StudentModel = {
  id: '',
  hallTicket: '',
  name: '',
  gender: '',
  dob: '',
  photo: '',
  phone: '',
  email: '',
  address: '',
  college: '',
  collegeCode: '',
  department: '',
  course: '',
  courseDuration: 4,
  yearOfStudy: 1,
  admissionDate: '',
  graduationDate: '',
  status: 'Active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const getEmptyStudent = () => ({ ...StudentModel });