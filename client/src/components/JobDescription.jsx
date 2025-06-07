import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Users,
  DollarSign,
} from "lucide-react";

const JobDescription = () => {
  // Dummy data for demonstration
  const job = {
    title: "Senior Frontend Developer",
    company: "TechNova",
    location: "Remote",
    salary: "13 LPA",
    positions: 2,
    experience: "3 yrs",
    applicants: 30,
    posted: "2024-06-01",
    description:
      "Join our dynamic team to build beautiful UIs with React and Tailwind CSS. Collaborate with designers and backend engineers to deliver world-class products.",
    role: "Frontend Developer",
    skills: ["React", "Tailwind CSS", "Redux", "TypeScript"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 mt-16 p-8">
        {/* Header */}
        <div className="">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="font-extrabold text-2xl text-[#F83002] flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#6A38C2]" />
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-blue-50 text-blue-700 font-bold border border-blue-100">
                  {job.positions} Positions
                </Badge>
                <Badge className="bg-[#fff0ee] text-[#F83002] font-bold border border-[#ffe5e0]">
                  {job.location}
                </Badge>
                <Badge className="bg-purple-50 text-[#7209b7] font-bold border border-purple-100">
                  {job.salary}
                </Badge>
                <Badge className="bg-green-50 text-green-700 font-bold border border-green-100">
                  {job.experience} Exp
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" /> Posted: {job.posted}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {job.applicants} Applicants
                </span>
              </div>
            </div>
            <Button className="rounded-full px-8 py-3 font-bold bg-[#F83002] hover:bg-[#d72600] text-white shadow-lg text-lg transition cursor-pointer">
              Apply Now
            </Button>
          </div>
        </div>
        {/* Description */}
        <div className="border-b-2 border-b-gray-200 pb-4 mb-6">
          <h2 className="font-bold text-lg text-[#6A38C2] mb-2">
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>
        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-[#F83002] mb-1">Role</h3>
            <p className="text-gray-800 mb-4">{job.role}</p>
            <h3 className="font-semibold text-[#F83002] mb-1">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
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
            <h3 className="font-semibold text-[#F83002] mb-1">Company</h3>
            <p className="text-gray-800 mb-4">{job.company}</p>
            <h3 className="font-semibold text-[#F83002] mb-1">Salary</h3>
            <p className="text-gray-800 mb-4 flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> {job.salary}
            </p>
            <h3 className="font-semibold text-[#F83002] mb-1">Experience</h3>
            <p className="text-gray-800">{job.experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
