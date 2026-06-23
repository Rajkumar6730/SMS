// src/components/students/StudentForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentPhotoUpload from './StudentPhotoUpload';
import {
  DEPARTMENTS,
  GENDER_OPTIONS,
  YEAR_OPTIONS,
  COURSE_DURATION_OPTIONS,
} from '../../utils/constants';
import { validateStudent } from '../../utils/validators';
import { useStudent } from '../../context/StudentContext';
import './StudentForm.css'; // We'll create this CSS file

const StudentForm = ({ initialData = {}, onSubmit, onCancel, submitLabel = 'Save' }) => {
  const { students } = useStudent();

  // Split full name into first and last for editing
  const getInitialName = () => {
    if (initialData.name) {
      const parts = initialData.name.split(' ');
      return {
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || '',
      };
    }
    return { firstName: '', lastName: '' };
  };

  const { firstName: initFirstName, lastName: initLastName } = getInitialName();

  const [formData, setFormData] = useState({
    firstName: initFirstName,
    lastName: initLastName,
    hallTicket: initialData.hallTicket || '',
    gender: initialData.gender || '',
    dob: initialData.dob || '',
    photo: initialData.photo || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    address: initialData.address || '',
    college: initialData.college || '',
    collegeCode: initialData.collegeCode || '',
    department: initialData.department || '',
    course: initialData.course || '',
    courseDuration: initialData.courseDuration || 4,
    yearOfStudy: initialData.yearOfStudy || 1,
    admissionDate: initialData.admissionDate || '',
    graduationDate: initialData.graduationDate || '',
    status: initialData.status || 'Active',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' }); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-calculate graduation date
  useEffect(() => {
    if (formData.admissionDate && formData.courseDuration) {
      const admission = new Date(formData.admissionDate);
      if (!isNaN(admission)) {
        const graduation = new Date(admission);
        graduation.setFullYear(admission.getFullYear() + Number(formData.courseDuration));
        setFormData((prev) => ({
          ...prev,
          graduationDate: graduation.toISOString().split('T')[0],
        }));
      }
    }
  }, [formData.admissionDate, formData.courseDuration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Clear status message when user starts typing
    if (submitStatus.message) setSubmitStatus({ type: '', message: '' });
  };

  const handlePhotoChange = (photoData) => {
    setFormData((prev) => ({ ...prev, photo: photoData }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    // Validate single field using the existing validator
    const studentObj = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
    };
    const fieldErrors = validateStudent(
      studentObj,
      students.filter((s) => s.id !== initialData.id) // exclude self when editing
    );
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const validateForm = () => {
    const existing = students.filter((s) => s.id !== initialData.id);
    const studentObj = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
    };
    const allErrors = validateStudent(studentObj, existing);
    setErrors(allErrors);
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);
    return Object.keys(allErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors above.' });
      return;
    }

    // Prepare data for backend (combine first & last name)
    const submitData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
    };
    delete submitData.firstName;
    delete submitData.lastName;
    if (!submitData.photo) delete submitData.photo;

    setIsSubmitting(true);
    try {
      // For editing, we might have an ID – but this form is used for both add and edit.
      // The parent component will handle the actual API call, but per requirement we directly post.
      // However, the requirement says "send data to backend using Axios" – we'll do that.
      // But to keep compatibility, we'll let the parent handle the submission if it's passed as onSubmit.
      // We'll support both: if onSubmit prop exists, call it; else do axios post.
      if (onSubmit) {
        // Parent component handles the submission (e.g., to update context)
        await onSubmit(submitData);
        setSubmitStatus({ type: 'success', message: 'Student saved successfully!' });
        resetForm();
      } else {
        // Direct axios post (for standalone usage)
        const response = await axios.post(
          'http://localhost:5000/api/students',
          submitData
        );
        setSubmitStatus({ type: 'success', message: 'Student added successfully!' });
        resetForm();
        // Optionally call onCancel to navigate away
        if (onCancel) onCancel();
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMsg =
        error.response?.data?.message || error.message || 'Failed to save student.';
      setSubmitStatus({ type: 'error', message: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      hallTicket: '',
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
    });
    setErrors({});
    setTouched({});
  };

  // If we have initialData, we don't want to reset on edit
  // but reset will be called after successful submit.

  return (
    <form onSubmit={handleSubmit} className="student-form">
      {submitStatus.message && (
        <div className={`form-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <div className="form-grid">
        {/* ---- Personal Information ---- */}
        <div className="form-section">
          <h3>Personal Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.firstName && errors.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.lastName && errors.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Hall Ticket *</label>
              <input
                type="text"
                name="hallTicket"
                value={formData.hallTicket}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.hallTicket && errors.hallTicket && (
                <span className="error">{errors.hallTicket}</span>
              )}
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select Gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {touched.gender && errors.gender && (
                <span className="error">{errors.gender}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.dob && errors.dob && (
                <span className="error">{errors.dob}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone (10 digits) *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern="[0-9]{10}"
                required
              />
              {touched.phone && errors.phone && (
                <span className="error">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.email && errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Residential Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>

        {/* ---- Academic Information ---- */}
        <div className="form-section">
          <h3>Academic Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>College Name *</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>College Code</label>
              <input
                type="text"
                name="collegeCode"
                value={formData.collegeCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Course *</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Course Duration (years) *</label>
              <select
                name="courseDuration"
                value={formData.courseDuration}
                onChange={handleChange}
                required
              >
                {COURSE_DURATION_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Year of Study *</label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Admission Date *</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expected Graduation Date (auto-calculated)</label>
              <input
                type="date"
                name="graduationDate"
                value={formData.graduationDate}
                readOnly
                style={{ background: '#f0f0f0' }}
              />
            </div>
          </div>
        </div>

        {/* ---- Photo Upload ---- */}
        <div className="form-section photo-section">
          <h3>Student Photo</h3>
          <StudentPhotoUpload
            onPhotoChange={handlePhotoChange}
            initialPhoto={formData.photo}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;