const express = require("express");
const router = express.Router();
const pool = require("../../config/db");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
