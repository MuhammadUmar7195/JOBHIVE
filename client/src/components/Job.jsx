import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  // Copy job link to clipboard
  const handleCopyLink = () => {
    const jobUrl = `${window.location.origin}/description/${job?._id}`;
    navigator.clipboard.writeText(jobUrl);
    toast.success("Job link copied!");
  };

  return (
    <div>
      <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <Button
            variant="outline"
            className="rounded-full cursor-pointer hover:bg-gray-100 transition"
            size="icon"
            onClick={handleCopyLink}
            title="Copy job link"
          >
            <Bookmark />
          </Button>
        </div>

        <div className="flex items-center gap-2 my-2">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                job?.company?.logo ||
                `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
                  job?.company?.name || "Company"
                )}`
              }
              alt={job?.company?.name || "Company Logo"}
              className="object-cover rounded-full"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <p className="text-sm text-gray-600">
            {job?.description && job.description.length > 300
              ? job.description.slice(0, 300) + "..."
              : job?.description}
          </p>
        </div>
        {/* Improved, compact badges */}
        <div className="flex flex-wrap items-center gap-1 mt-4">
          <span className="bg-blue-100 text-blue-700 font-semibold border border-blue-200 px-2 py-0.5 rounded-md text-xs">
            {job?.position} Pos
          </span>
          <span className="bg-[#fff0ee] text-[#F83002] font-semibold border border-[#ffd6cc] px-2 py-0.5 rounded-md text-xs">
            {job?.jobType}
          </span>
          <span className="bg-purple-100 text-[#7209b7] font-semibold border border-purple-200 px-2 py-0.5 rounded-md text-xs">
            Rs. {job?.salary}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="outline"
            className="cursor-pointer hover:bg-gray-100 transition"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
