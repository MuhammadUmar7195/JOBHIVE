import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { Briefcase, MapPin, CalendarDays, Users } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/store/Slices/jobs.slice";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "../utils/api.constant.js"; // Adjust the import path as necessary

const JobDescription = () => {
  const { user } = useSelector((state) => state?.auth);
  const { singleJob } = useSelector((state) => state?.job);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });
        
        if (res?.data?.success) {
          dispatch(setSingleJob(res?.data?.job));
          setIsApplied(
            res?.data?.job?.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log("Fetch single job error: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSingleJob();
  }, [dispatch, id, user?._id]);

  const handleApply = async () => {
    if (!user) {
      toast.error("Please login to apply for this job");
      return;
    }

    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/application/apply/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to apply for the job. Please try again later."
      );
    } finally {
      setIsApplied(true); // Ensure the button is disabled after applying
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-16">
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <MoonLoader color="#F83002" size={48} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 mt-16 p-8 md:p-12">
          {/* Header */}
          <div className="">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-10">
              <div>
                <h1 className="font-extrabold text-3xl md:text-4xl text-[#F83002] flex items-center gap-3 mb-4">
                  <Briefcase className="w-8 h-8 text-[#6A38C2]" />
                  {singleJob?.title.toUpperCase() || "Job Title"}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-4 mb-4">
                  <Badge className="bg-blue-50 text-blue-700 font-bold border border-blue-100 px-4 py-2">
                    {singleJob?.position || 0} Positions
                  </Badge>
                  <Badge className="bg-[#fff0ee] text-[#F83002] font-bold border border-[#ffe5e0] px-4 py-2">
                    {singleJob?.location || "N/A"}
                  </Badge>
                  <Badge className="bg-purple-50 text-[#7209b7] font-bold border border-purple-100 px-4 py-2">
                    Rs. {singleJob?.salary || "N/A"}
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 font-bold border border-green-100 px-4 py-2">
                    {singleJob?.experienceLevel || "N/A"} Exp
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-500 text-base">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />{" "}
                    {singleJob?.location || "N/A"}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" /> Posted:{" "}
                    {singleJob?.createdAt
                      ? singleJob.createdAt.split("T")[0]
                      : "N/A"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />{" "}
                    {singleJob?.applications?.length || 0} Applicants
                  </span>
                </div>
              </div>
              {isApplied ? (
                <Button
                  disabled
                  className="rounded-lg bg-green-100 border border-green-400 text-green-700 font-semibold flex items-center gap-2 px-8 py-3 shadow transition-all duration-200 cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Already Applied
                </Button>
              ) : (
                <Button
                  onClick={handleApply}
                  className="rounded-lg bg-[#7209b7] hover:bg-[#5f32ad] text-white font-bold px-8 py-3 shadow transition-all duration-200 cursor-pointer"
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="border-b-2 border-b-gray-200 pb-6 mb-8">
            <h2 className="font-bold text-2xl text-[#6A38C2] mb-3">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {singleJob?.description || "No description available."}
            </p>
          </div>
          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold text-[#F83002] mb-2 text-lg">
                Role
              </h3>
              <p className="text-gray-800 mb-6">
                {singleJob?.position || "N/A"}
              </p>
              <h3 className="font-semibold text-[#F83002] mb-2 text-lg">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {(singleJob?.requirements || []).map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-[#f3e8ff] text-[#6A38C2] border border-[#e0d7fa] px-3 py-1 text-sm font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#F83002] mb-2 text-lg">
                Salary
              </h3>
              <p className="text-gray-800 mb-6 flex items-center gap-2">
                Rs. {singleJob?.salary || "N/A"}
              </p>
              <h3 className="font-semibold text-[#F83002] mb-2 text-lg">
                Experience
              </h3>
              <p className="text-gray-800 mb-6">
                {singleJob?.experienceLevel || "N/A"}
              </p>
              <h3 className="font-semibold text-[#F83002] mb-2 text-lg">
                Job Type
              </h3>
              <p className="text-gray-800 mb-6">
                {singleJob?.jobType || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
