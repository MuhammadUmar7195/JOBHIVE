import { Briefcase } from "lucide-react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

const LatestJob = () => {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <section className="w-full bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center tracking-tight">
          <span className="text-[#6A38C2] drop-shadow">Latest & Top </span>
          <span className="text-[#F83002] drop-shadow">Job Openings</span>
        </h1>
        {allJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Briefcase className="stroke-orange-600" />
            <span className="text-lg text-gray-500 font-semibold">
              No Jobs Available
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allJobs.map((job) => (
              <LatestJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJob;
