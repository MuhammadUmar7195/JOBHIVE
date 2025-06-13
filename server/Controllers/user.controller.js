import { User } from "../Models/user.model.js";
import argon from "argon2";
import jwt from "jsonwebtoken";
import getDataUri from "../Utils/datauri.js";
import cloudinary from "../Utils/cloudinary-setup.js";
import { generateOTP, transporter } from "../Utils/nodemailer.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is missing"
            });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exist with this email.',
            });
        }

        let profilePhoto = "";

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "jobhive/avatar-profile",
                resource_type: "auto",
            });
            profilePhoto = cloudResponse.secure_url;
        }
        const hashedPassword = await argon.hash(password);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhoto
            }
        });
        res.status(201).json({
            success: true,
            message: 'Account Created Successfully.',
        });
    } catch (error) {
        console.log("Register error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is missing"
            });
        }
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Email & Password.',
            });
        }
        const isPasswordMatch = await argon.verify(user.password, password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email & Password.",
            })
        };

        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: "Account doesn't exist with current role.",
            })
        };

        //token payload
        const tokenData = {
            userId: user._id
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user
        });
    } catch (error) {
        console.log("Login error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const skillArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use by another account."
                });
            }
        }

        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillArray;

        // for profile photo
        if (file) {
            const fileUri1 = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri1.content, {
                folder: "jobhive/avatar-profile", // same as register
                resource_type: "auto",
            });
            user.profile.profilePhoto = cloudResponse.secure_url;
        }

        // for resume photo
        if (file) {
            const fileUri2 = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri2.content, {
                folder: "jobhive/resume",
                resource_type: "raw",
                type: "upload"
            });
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });

    } catch (error) {
        console.log("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

// Forget password logic here

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Password Reset Request</h2>
                    <p>You requested to reset your password. Here is your OTP:</p>
                    <h3 style="background: #f3f4f6; display: inline-block; padding: 10px 20px; border-radius: 5px;">${otp}</h3>
                    <p>This OTP is valid for 15 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        //To save otp or expiry time in schema
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });
    } catch (error) {
        console.log("Forgot Route error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }

        // Check OTP and expiry
        if (
            !user.otp ||
            !user.otpExpiry ||
            user.otp !== otp ||
            user.otpExpiry < Date.now()
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    } catch (error) {
        console.log("Verify OTP Route error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Email, new password, and confirm password are required"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Optionally: Check if OTP is already verified (e.g., user.otp == null)
        if (user.otp || user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP verification required before resetting password"
            });
        }

        user.password = await argon.hash(newPassword);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log("Reset Password Route error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}