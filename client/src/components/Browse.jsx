/* eslint-disable no-unused-vars */
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import Job from "./Job";

const Browse = () => {
  const { allJobs } = useSelector((state) => state?.job || {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff]">
      <Navbar />
      <div className="mt-16 max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#F83002]">
            Search Results
            <span className="ml-2 text-gray-600 font-medium text-lg">
              ({allJobs.length} results)
            </span>
          </h1>
        </div>
        {allJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-lg text-gray-500 font-semibold">
              No jobs found. Try another search!
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allJobs.map((job) => (
              <Job key={job?._id || job?.id || job?.title} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
