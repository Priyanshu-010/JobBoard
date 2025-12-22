import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { getJobs, getSingleJob } from "../controllers/job.controller.js";

const router = express.Router();

// Public
router.get("/", getJobs);
router.get("/:id", getSingleJob);

// Admin
router.post("/", protect, isAdmin);
router.put("/:id", protect, isAdmin);
router.delete("/:id", protect, isAdmin);

// User
router.post("/:id/apply", protect);

// Admin - Applcation Management
router.patch("/:id/applications/:userId", protect, isAdmin);

export default router;
