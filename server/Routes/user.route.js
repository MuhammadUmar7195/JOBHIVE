import express from "express";
const router = express.Router();
import { register, login, updateProfile, logout, forgotPassword, verifyOTP, resetPassword } from "../Controllers/user.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { singleUpload } from "../Middleware/multer.js";

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", singleUpload, isAuthenticated, updateProfile);

//Forget password routes 
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;