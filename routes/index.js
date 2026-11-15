import express from "express";
import authRoutes from "./auth.routes.js";
import analysisRoutes from "./analysis.routes.js";
import adminRoutes from "./admin.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/analyses", analysisRoutes);
// Direct analyze route mapping for backward compatibility with frontend POST /api/analyze
router.use("/auth", authRoutes);
router.use("/analyses", analysisRoutes);
router.use("/admin", adminRoutes); // ye line "/" wali line se PEHLE
router.use("/", analysisRoutes);

export default router;
