/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import Job from "./Job";
import { ArrowDownNarrowWide, Loader2 } from "lucide-react";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs(); // Fetch all jobs when the component mounts
  const { allJobs } = useSelector((state) => state?.job || {});
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const jobsToShow = allJobs.slice(0, visibleCount);

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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobsToShow.map((job) => (
                <Job key={job?._id || job?.id || job?.title} job={job} />
              ))}
            </div>
            {visibleCount < allJobs.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  className="px-5 py-3 rounded-full bg-[#F83002] text-white font-semibold shadow hover:bg-[#d72600] transition cursor-pointer flex items-center gap-3.5"
                  >
                  <ArrowDownNarrowWide/>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
