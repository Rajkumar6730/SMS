// src/utils/validators.js

/**
 * Validate Hall Ticket – required & unique
 */
export const validateHallTicket = (hallTicket, existingStudents) => {
  if (!hallTicket || hallTicket.trim() === '') {
    return 'Hall Ticket is required';
  }
  if (existingStudents.some(s => s.hallTicket === hallTicket.trim())) {
    return 'Hall Ticket must be unique';
  }
  return null;
};

/**
 * Validate Phone – exactly 10 digits
 */
export const validatePhone = (phone) => {
  if (!phone) return 'Phone is required';
  if (!/^\d{10}$/.test(phone)) {
    return 'Phone must be exactly 10 digits';
  }
  return null;
};

/**
 * Validate Email – valid format
 */
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Invalid email format';
  }
  return null;
};

/**
 * Validate Date of Birth – not future, at least 16 years old
 */
export const validateDob = (dob) => {
  if (!dob) return 'Date of Birth is required';
  const date = new Date(dob);
  if (isNaN(date)) return 'Invalid date';
  if (date > new Date()) {
    return 'Date of Birth cannot be in the future';
  }
  const age = new Date().getFullYear() - date.getFullYear();
  if (age < 16) {
    return 'Student must be at least 16 years old';
  }
  return null;
};

/**
 * Master validation – accepts student object with either `name` or `firstName`+`lastName`
 */
export const validateStudent = (student, existingStudents) => {
  const errors = {};

  // ---- Name validation (supports both old and new format) ----
  let fullName = '';
  if (student.firstName !== undefined && student.lastName !== undefined) {
    fullName = `${student.firstName} ${student.lastName}`.trim();
  } else if (student.name !== undefined) {
    fullName = student.name.trim();
  }

  if (!fullName) {
    errors.name = 'Name is required';
  }

  // ---- Hall Ticket ----
  const hallTicketError = validateHallTicket(student.hallTicket, existingStudents);
  if (hallTicketError) errors.hallTicket = hallTicketError;

  // ---- Gender ----
  if (!student.gender) {
    errors.gender = 'Gender is required';
  }

  // ---- Phone ----
  const phoneError = validatePhone(student.phone);
  if (phoneError) errors.phone = phoneError;

  // ---- Email ----
  const emailError = validateEmail(student.email);
  if (emailError) errors.email = emailError;

  // ---- Date of Birth ----
  const dobError = validateDob(student.dob);
  if (dobError) errors.dob = dobError;

  // (Add more validations here as needed)

  return errors;
};