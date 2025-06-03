import express from "express";
const router = express.Router();
import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../Controllers/application.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/get", isAuthenticated, getAppliedJob);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.post("/status/:id/update", isAuthenticated, updateStatus);

export default router;