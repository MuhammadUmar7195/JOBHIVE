import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";

const ViewProfile = ({ setOpen }) => {
  const { user } = useSelector((state) => state?.auth);

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
    <div>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 sm:my-10 p-4 sm:p-8 shadow-lg mt-16">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 shadow-lg border-2 border-[#F83002]">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
                alt={user?.fullname}
                className="object-cover"
              />
              {!user?.profile?.profilePhoto && (
                <span className="flex items-center justify-center h-full w-full text-3xl font-bold text-[#F83002] bg-gray-100 rounded-full">
                  {getInitials(user?.fullname)}
                </span>
              )}
            </Avatar>
            <div className="flex flex-col items-center sm:items-start w-full">
              <h1 className="font-bold text-xl sm:text-2xl text-gray-900 text-center sm:text-left">
                {user?.fullname}
              </h1>
              <p className="text-gray-500 mt-1 text-center sm:text-left text-sm sm:text-base">
                {user?.profile?.bio || "No bio provided."}
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <Mail className="text-[#6A38C2]" size={18} />
                  <span className="text-gray-700 text-sm sm:text-base">
                    {user?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Contact className="text-[#F83002]" size={18} />
                  <span className="text-gray-700 text-sm sm:text-base">
                    {user?.phoneNumber || "NA"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full px-6 py-2 font-semibold border-2 border-[#F83002] text-[#F83002] hover:bg-[#F83002] hover:text-white transition cursor-pointer mt-4 md:mt-0 w-full md:w-auto"
            variant="outline"
          >
            <Pen className="mr-2" size={18} />
            Edit Profile
          </Button>
        </div>
        {/* Skills */}
        <div className="my-6 sm:my-8">
          <h2 className="font-semibold text-base sm:text-lg text-[#6A38C2] mb-2 text-center sm:text-left">
            Skills
          </h2>
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            {hasSkills ? (
              user?.profile?.skills.map((item, index) => (
                <span
                  key={index}
                  className="bg-[#f3e8ff] text-[#6A38C2] border border-[#e0d7fa] px-3 py-1 text-xs sm:text-sm font-medium rounded-lg"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>
        {/* Resume */}
        <div className="my-6 sm:my-8">
          <Label className="text-md font-bold text-[#F83002] block text-center sm:text-left">
            Resume
          </Label>
          {hasResume ? (
            <div className="mt-2 flex justify-center sm:justify-start">
              <Link
                target="_blank"
                to={user?.profile?.resume}
                className="text-blue-600 hover:underline font-medium break-all"
              >
                {user?.profile?.resumeOriginalName || "Download Resume"}
              </Link>
            </div>
          ) : (
            <span className="text-gray-400 ml-2 block text-center sm:text-left">
              NA
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
