// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // Check if token exists in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user details (excluding password)
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }

            next();

        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }
};

module.exports = protect;