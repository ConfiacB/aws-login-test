const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user information in request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;