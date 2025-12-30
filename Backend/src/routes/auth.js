// Backend/src/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, phone, location, language } = req.body;

    // Stronger validation (prevents empty name like " ")
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role: role || "farmer",
      phone: phone || null,
      location: location || null,
      language: language || "en",
    });

    return res.status(201).json({
      message: "Registered successfully",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("❌ Registration error FULL:", e);

    // ✅ Return real Sequelize validation/DB errors
    return res.status(500).json({
      error: "Registration failed",
      detail:
        e?.errors?.map((x) => x.message).join(", ") ||
        e?.parent?.detail ||
        e.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, language: user.language },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        language: user.language,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ error: "Login failed" });
  }
});

export default router;