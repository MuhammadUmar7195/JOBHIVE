import express from "express";
const router = express.Router();
import { registerCompany, getCompany, getCompanyById, updateCompany } from "../Controllers/company.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { singleUpload } from "../Middleware/multer.js";

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

export default router;