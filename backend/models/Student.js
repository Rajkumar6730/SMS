const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  hallTicket: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: { type: String }, // or Date
  photo: { type: String }, // base64 or URL
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  college: { type: String, required: true },
  collegeCode: { type: String },
  department: { type: String, required: true },
  course: { type: String, required: true },
  courseDuration: { type: Number, required: true },
  yearOfStudy: { type: Number, required: true },
  admissionDate: { type: String }, // or Date
  graduationDate: { type: String },
  status: { type: String, enum: ['Active', 'Near Completion', 'Graduated'], default: 'Active' }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Student', StudentSchema);