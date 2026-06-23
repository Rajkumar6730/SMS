const Student = require('../models/Student');

// @desc    Get all students with pagination & filters
exports.getStudents = async (req, res) => {
  try {
    // Pagination params (default: page 1, limit 20)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter object from query params
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.yearOfStudy) filter.yearOfStudy = parseInt(req.query.yearOfStudy);
    // Add more filters as needed

    // Run both queries in parallel for speed
    const [students, total] = await Promise.all([
      Student.find(filter)
        .skip(skip)
        .limit(limit)
        .lean(), // <-- speeds up results (plain objects)
      Student.countDocuments(filter)
    ]);

    res.json({
      students,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).lean();
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete ALL students (bulk delete)
exports.deleteAllStudents = async (req, res) => {
  try {
    const result = await Student.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} students.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};