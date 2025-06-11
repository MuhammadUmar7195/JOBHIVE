import { JOB_API_ENDPOINT } from "@/utils/api.constant";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Loader2, Star } from "lucide-react";
import Navbar from "../shared/Navbar";

const PostJob = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setData({ ...data, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-8">
      <Navbar />
      <div className="flex items-center justify-center w-full my-5 px-2 mt-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-8"
        >
          <h1 className="text-2xl font-extrabold text-[#F83002] mb-10 text-center tracking-tight mt-4 uppercase">
            Post a New Job
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={data?.title}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                value={data?.description}
                onChange={changeEventHandler}
                className="my-1 w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:ring-2 focus:ring-[#F83002] transition resize-y min-h-[80px]"
                placeholder="Breif your job description"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={data?.requirements}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. React, Node.js"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={data?.salary}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. 50000"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={data?.location}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. Remote, New York"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={data?.jobType}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. Full-time"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={data?.experience}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. 2+ years"
              />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={data?.position}
                onChange={changeEventHandler}
                className="my-1"
                placeholder="e.g. 3"
                min={1}
              />
            </div>
            <div className="md:col-span-2">
              {companies.length > 0 && (
                <div className="mt-2">
                  <Label>Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company?.name?.toLowerCase()}
                          >
                            {company?.name}
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
            <Button
              type="submit"
              className="w-full my-6 bg-[#F83002] hover:bg-[#d72600] text-white font-bold text-lg rounded-lg shadow transition"
            >
              Post New Job
            </Button>
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

export default PostJob;
