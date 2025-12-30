// Backend/src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "./config/database.js"; // ✅ ADD THIS

import authRoutes from "./routes/auth.js";
import cropRoutes from "./routes/crops.js";
import demandRoutes from "./routes/demand.js";
import chatRoutes from "./routes/chat.js";
import paymentRoutes from "./routes/payments.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ CORS (recommended: allow single origin, not '*', when using credentials)
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

// Static uploads
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "..", process.env.FILE_UPLOAD_DIR || "uploads")
  )
);

// Health route
app.get("/", (req, res) => {
  res.json({ ok: true, name: "FarmLink API", version: "1.0.0" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/demand", demandRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ai", aiRoutes);


// ✅ START SERVER ONLY AFTER DB CONNECTS
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");

    await sequelize.sync(); // during dev you can use: sequelize.sync({ alter: true })
    console.log("✅ Sequelize models synced");

    app.listen(PORT, () => {
      console.log(`🚀 API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection/sync failed:", err);
    process.exit(1);
  }
})();
