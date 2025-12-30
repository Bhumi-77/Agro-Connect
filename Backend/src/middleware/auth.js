// Backend/src/middleware/auth.js
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    // ✅ Support both Authorization: Bearer <token> AND x-auth-token
    const authHeader = req.headers.authorization;
    const altToken = req.headers["x-auth-token"] || req.headers.token;

    let token = null;

    if (authHeader) {
      // Accept both "Bearer <token>" and "<token>"
      token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7).trim()
        : authHeader.trim();
    } else if (altToken) {
      token = String(altToken).trim();
    }

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, language }
    return next();
  } catch (e) {
    return res.status(401).json({
      error: "Invalid token",
      detail: e.message, // helpful while developing
    });
  }
}
