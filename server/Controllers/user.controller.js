import { User } from "../Models/user.model.js";
import argon from "argon2";
import jwt from "jsonwebtoken";
import getDataUri from "../Utils/datauri.js";
import cloudinary from "../Utils/cloudinary-setup.js";

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
        let cloudResponse = { secure_url: "" };
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exist with this email.',
            });
        }
        const hashedPassword = await argon.hash(password);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        })
        res.status(201).json({
            success: true,
            message: 'Account Created Successfully.',
        })
    } catch (error) {
        console.log("Register error", error);
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
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        let skillArray;
        if (skills) {
            skillArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (fullname)
            user.fullname = fullname;
        if (email)
            user.email = email;
        if (phoneNumber)
            user.phoneNumber = phoneNumber;
        if (bio)
            user.profile.bio = bio;
        if (skills)
            user.profile.skills = skillArray;

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalName;
        }

        await user.save();
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: updatedUser
        });

    } catch (error) {
        console.log("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


