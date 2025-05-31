import express from "express";
const router = express.Router();
import { register, login, updateProfile, logout } from "../Controllers/user.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, updateProfile);

export default router;