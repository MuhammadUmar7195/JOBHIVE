import express from "express";
const router = express.Router();
import { postJob, getJobById, getAllJob, getAdminJob, updateJob } from "../Controllers/job.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJob);
router.get("/get/:id", getJobById);
router.get("/getadminjobs", isAuthenticated, getAdminJob);
router.put("/update/:id", isAuthenticated, updateJob);

export default router;