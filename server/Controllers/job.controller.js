import { Job } from "../Models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

//Student ka leya ya wla route 
export const getAllJob = async (req, res) => {
    try {
        const keyword = req.query?.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const job = await Job.find(query).populate(
            { path: "company" }
        ).sort({ createdAt: -1 });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }
        return res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

//student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Jobs not found.",
            })
        };
        return res.status(200).json({ success: true, job });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

//admin na kitni jobs create ki hain us ka leya ya wla route
export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false,
            })
        };
        return res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        const updateData = {
            title,
            description,
            requirements: Array.isArray(requirements)
                ? requirements
                : typeof requirements === "string"
                    ? requirements.split(",")
                    : [],
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId
        };

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job updated successfully.",
            job: updatedJob
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
};


