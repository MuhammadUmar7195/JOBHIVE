import { Job } from "../Models/job.model.js";
import { Application } from "../Models/applicaiton.model.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        if (!jobId) {
            return res.status(400).json({
                sucess: false,
                message: "Job ID is required."
            })
        }
        //Aghr pahla sa hi apply huwa ha toh 
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                sucess: false,
                message: "You have Already Applied for this job."
            })
        }

        //check job is available
        const jobAvailable = await Job.findById(jobId);
        if (!jobAvailable) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        jobAvailable.applications.push(newApplication._id);
        await jobAvailable.save();
        return res.status(201).json({
            success: true,
            message: "Job applied successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "No Applications",
            });
        }

        return res.status(200).json({
            success: true,
            application
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };

        return res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required',
            });
        }

        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found.",
            })
        };

        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success: true,
            message: "Status Updated Successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
}