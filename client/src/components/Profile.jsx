import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge, Contact, Mail, Pen } from "lucide-react";
import { useSelector } from "react-redux";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {
  const { user } = useSelector((state) => state?.auth);
  const [open, setOpen] = useState(false);

  // Helper for fallback avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const hasSkills = user?.profile?.skills && user?.profile?.skills.length > 0;
  const hasResume = !!user?.profile?.resume;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-10 p-8 shadow-lg mt-16">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 shadow-lg border-2 border-[#F83002]">
              <AvatarImage
                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                alt={user?.fullname}
                className=" object-cover"
              />
              {user?.profile?.avatar && (
                <span className="flex items-center justify-center h-full w-full text-3xl font-bold text-[#F83002] bg-gray-100 rounded-full">
                  {getInitials(user?.fullname)}
                </span>
              )}
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-900">{user?.fullname}</h1>
              <p className="text-gray-500 mt-1">{user?.profile?.bio || "No bio provided."}</p>
              <div className="flex items-center gap-3 mt-3">
                <Mail className="text-[#6A38C2]" size={18} />
                <span className="text-gray-700">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Contact className="text-[#F83002]" size={18} />
                <span className="text-gray-700">{user?.phoneNumber || "NA"}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full px-6 py-2 font-semibold border-2 border-[#F83002] text-[#F83002] hover:bg-[#F83002] hover:text-white transition cursor-pointer"
            variant="outline"
          >
            <Pen className="mr-2" size={18} />
            Edit Profile
          </Button>
        </div>
        {/* Skills */}
        <div className="my-8">
          <h2 className="font-semibold text-lg text-[#6A38C2] mb-2">Skills</h2>
          <div className="flex flex-wrap items-center gap-2">
            {hasSkills ? (
              user?.profile?.skills.map((item, index) => (
                <span key={index} className="bg-[#f3e8ff] text-[#6A38C2] border border-[#e0d7fa] px-3 py-1 text-sm font-medium rounded-lg">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>
        {/* Resume */}
        <div className="my-8">
          <Label className="text-md font-bold text-[#F83002]">Resume</Label>
          {hasResume ? (
            <div className="mt-2">
              <Link
                target="_blank"
                to={user?.profile?.resume}
                className="text-blue-600 hover:underline font-medium"
              >
                {user?.profile?.resumeOriginalName || "Download Resume"}
              </Link>
            </div>
          ) : (
            <span className="text-gray-400 ml-2">NA</span>
          )}
        </div>
      </div>
      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 mt-8 p-6">
        <h2 className="font-bold text-lg mb-4 text-[#F83002]">Applied Jobs</h2>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;