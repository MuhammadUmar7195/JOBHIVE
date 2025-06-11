import { useSelector } from "react-redux";
import FilterCard from "./FilterCard.jsx";
import Job from "./Job.jsx";
import Navbar from "./shared/Navbar.jsx";
import { useEffect, useState } from "react";
import Footer from "./shared/Footer.jsx";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";


const Jobs = () => {
  useGetAllJobs(); // Fetch all jobs when the component mounts
  const { allJobs, searchedQuery } = useSelector((state) => state?.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const matchLocation =
          !searchedQuery.location ||
          job?.location?.toLowerCase() === searchedQuery.location.toLowerCase();
        const matchIndustry =
          !searchedQuery.industry ||
          job?.title?.toLowerCase() === searchedQuery.industry.toLowerCase();
        const matchSalary =
          !searchedQuery.salary ||
          (job?.salaryRange && job.salaryRange === searchedQuery.salary);

        return matchLocation && matchIndustry && matchSalary;
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff]">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <FilterCard />
          </aside>
          {/* Jobs List */}
          <main className="w-full lg:w-3/4 mt-16">
            {filterJobs && filterJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow">
                <span className="text-xl text-gray-400 font-semibold">
                  Job not Found
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterJobs.map((job) => (
                  <Job key={job?._id} job={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Jobs;
