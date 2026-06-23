const express = require('express');
const auth = require('../middleware/auth');
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudents   // <-- ADD THIS IMPORT
} = require('../controllers/studentController');

const router = express.Router();

// All student routes are protected (require token)
router.use(auth);

// Routes
router.route('/')
  .get(getStudents)
  .post(createStudent);

// ========== BULK DELETE – MUST COME BEFORE /:id ==========
router.delete('/all', deleteAllStudents);  // <-- ADD THIS LINE

router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;