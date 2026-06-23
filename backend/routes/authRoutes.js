const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
// Optional register route (for initial admin setup)
router.post('/register', register);

module.exports = router;