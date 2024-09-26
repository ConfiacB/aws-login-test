const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Login
const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(401).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Unauthorized' });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
};

// User Registration
const register = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Username already exists' });
      }
      res.status(500).json({ message: 'Error registering user' });
    }
};

// User Logout
const logout = async (req, res) => {
    // Invalidate the token on the client-side (e.g., remove from localStorage)
    // This will typically be handled in the frontend
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    login,
    register,
    logout,
}