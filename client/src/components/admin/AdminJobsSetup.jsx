import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/api.constant";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const AdminJobsSetup = () => {
  useGetAllJobs();

  const { companies } = useSelector((store) => store?.company);
  const { allJobs } = useSelector((store) => store?.job);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const jobId = params.id;
  const selectedJob = allJobs?.find((job) => job._id === jobId);

  // SAFELY set initial state and update when selectedJob changes
  const [data, setData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1,
    companyId: "",
  });

  useEffect(() => {
    if (selectedJob) {
      setData({
        title: selectedJob.title || "",
        description: selectedJob.description || "",
        requirements: selectedJob.requirements || "",
        salary: selectedJob.salary || "",
        location: selectedJob.location || "",
        jobType: selectedJob.jobType || "",
        experience: selectedJob.experienceLevel || "",
        position: Number(selectedJob.position) || 1,
        companyId: selectedJob.company?._id || "",
      });
    }
  }, [selectedJob]);

  const changeEventHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setData({ ...data, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // if (!window.confirm("Are you sure you want to delete this job?")) return;
    // try {
    //   setLoading(true);
    //   const res = await axios.delete(
    //     `${JOB_API_ENDPOINT}/delete/${params.id}`,
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   if (res.data.success) {
    //     toast.success(res.data.message);
    //     navigate("/admin/jobs");
    //   }
    // } catch (error) {
    //   toast.error(error?.response?.data?.message || "Failed to delete job");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-8">
      <Navbar />
      <div className="flex items-center justify-center w-full my-5 px-2 mt-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-8"
        >
          <h1 className="text-2xl font-extrabold text-[#F83002] mb-10 text-center tracking-tight mt-2 uppercase">
            Update a Job
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 ml-1">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="title"
                value={data?.title || ""}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div>
              <Label className="mb-2 ml-1">
                Description<span className="text-red-500">*</span>
              </Label>
              <textarea
                name="description"
                value={data?.description || ""}
                onChange={changeEventHandler}
                className="my-1 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:ring-2 focus:ring-[#F83002] transition resize-y min-h-[80px]"
                placeholder="Brief your job description"
              />
            </div>
            <div>
              <Label className="mb-2 ml-1">
                Requirements<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="requirements"
                value={data?.requirements || ""}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. React, Node.js"
              />
            </div>
            <div>
              <Label className="mb-2 ml-1">
                Salary<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="salary"
                value={data?.salary || ""}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. 50000"
              />
            </div>
            <div>
              <Label className="mb-2 ml-1">
                Location<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="location"
                value={data?.location || ""}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. Remote, New York"
              />
            </div>
            <div>
              <Label className="mb-2 ml-1">
                Job Type<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="jobType"
                value={data?.jobType || ""}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. Full-time"
              />
            </div>
            <div>
              <Label className="mb-2 ml-1">
                Experience Level<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="experience"
                value={data?.experience || ""}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. 2+ years"
              />
            </div>
            <div>
              <Label className="mb-2 ml-1">
                No of Positions<span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="position"
                value={data?.position || ""}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. 3"
                min={1}
              />
            </div>
            <div className="md:col-span-2">
              {companies.length > 0 && (
                <div className="mt-2">
                  <Label className="mb-2 ml-1">
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={data.companyId}
                    onValueChange={selectChangeHandler}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem key={company._id} value={company._id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-6" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                className="w-full my-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7209b7] to-[#b5179e] text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-200 hover:from-[#560bad] hover:to-[#f72585] focus:ring-2 focus:ring-[#7209b7] focus:outline-none cursor-pointer"
              >
                Update
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                className="w-full mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-200 hover:from-red-700 hover:to-red-500 focus:ring-2 focus:ring-red-600 focus:outline-none cursor-pointer"
              >
                Delete
              </Button>
            </>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              * Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminJobsSetup;
