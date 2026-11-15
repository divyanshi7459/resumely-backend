import express from "express";
import User from "../models/user.models.js";
import Analysis from "../models/analysis.models.js";
import { requireAuth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(requireAuth);

router.use((req, res, next) => {
  const admin = (process.env.ADMIN_EMAIL || "").toLowerCase();
  if (!admin || req.auth.email !== admin) {
    return res.status(403).json({ error: "Sirf admin ke liye." });
  }
  next();
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
});

router.get("/analyses", async (req, res, next) => {
  try {
    const analyses = await Analysis.find()
      .populate("user", "name email")
      .select("resumeName score createdAt user")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ count: analyses.length, analyses });
  } catch (error) {
    next(error);
  }
});

export default router;
