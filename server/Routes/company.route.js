import express from "express";
const router = express.Router();
import { registerCompany, getCompany, getCompanyById, updateCompany } from "../Controllers/company.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", getCompany);
router.get("/get/:id", getCompanyById);
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;