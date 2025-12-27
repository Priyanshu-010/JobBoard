import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  applyToJob,
  createJob,
  deleteJob,
  getJobs,
  getSingleJob,
  updateApplicationStatus,
  updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Public
router.get("/", protect, getJobs);
router.get("/:id", protect, getSingleJob);

// Admin
router.post("/", protect, isAdmin, createJob);
router.put("/:id", protect, isAdmin, updateJob);
router.delete("/:id", protect, isAdmin, deleteJob);

// User
router.post("/:id/apply", protect, applyToJob);

// Admin - Applcation Management
router.patch(
  "/:id/applications/:userId",
  protect,
  isAdmin,
  updateApplicationStatus
);

export default router;
