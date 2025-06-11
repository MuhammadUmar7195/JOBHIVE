import { Company } from "../Models/company.model.js";
import getDataUri from "../Utils/datauri.js";
import cloudinary from "../Utils/cloudinary-setup.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Company Name is Required."
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                success: false,
                message: "You can't register same company."
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            success: true,
            message: "Company registered successfully.",
            company,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const companies = await Company.find({ userId });
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            companies
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found."
            })
        }
        return res.status(200).json({
            success: true,
            company
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        let logo = "";

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "jobhive/company-logo",
                resource_type: "auto",
            });
            logo = cloudResponse.secure_url;
        }

        const updateData = { name, description, website, location, logo };

        const companyData = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!companyData) {
            return res.status(404).json({
                success: false,
                message: "Company not found."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Company Information Updated."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByIdAndDelete(companyId);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Company deleted successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};