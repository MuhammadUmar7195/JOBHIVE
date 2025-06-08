import express from "express";
const router = express.Router();
import { postJob, getJobById, getAllJob, getAdminJob } from "../Controllers/job.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJob);
router.get("/get/:id", isAuthenticated, getJobById);
router.get("/getadminjobs", isAuthenticated, getAdminJob);

export default router;