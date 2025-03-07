const jwt = require('jsonwebtoken');
const { verifierToken } = require('../utils/auth'); // Import your utility function

// Middleware to verify if the user is authenticated (JWT token)
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Bearer <token>
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    // Use the verifierToken utility function to verify the token
    try {
        const decoded = verifierToken(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded token (user info) to the request object
        next();  // Continue to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Middleware to check if the user has the right role (for authorization)
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: insufficient role' });
        }
        next();
    };
};

module.exports = { verifyToken, checkRole };
