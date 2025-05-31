import { User } from "../Models/user.model.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is missing"
            });
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
            role
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
        
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const skillArray = skills.split(",");
        const userId = req.id; 

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillArray;

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


