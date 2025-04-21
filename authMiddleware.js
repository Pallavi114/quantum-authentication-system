const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Retrieve and trim the token
    const token = req.header("Authorization")?.trim();

    // Check if token is provided and in proper format
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Access Denied! No token provided or invalid token format." });
    }

    // Remove "Bearer " prefix and trim
    const actualToken = token.replace("Bearer ", "").trim();

    try {
        // Verify the token using the secret from .env
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded; // decoded payload should include userId or other data you set
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(400).json({ success: false, message: "Invalid token!" });
    }
};
