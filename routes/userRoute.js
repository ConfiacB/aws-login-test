const express = require('express');
const { login, register, logout } = require('../controllers/userController');
const router = express.Router();

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

// User Logout (Client-side action)
router.post('/logout', logout);

module.exports = router;
