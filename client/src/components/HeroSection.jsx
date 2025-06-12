import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const registrationData = [
    { month: "Jan", Students: 40, Recruiters: 10 },
    { month: "Feb", Students: 60, Recruiters: 18 },
    { month: "Mar", Students: 80, Recruiters: 25 },
    { month: "Apr", Students: 65, Recruiters: 22 },
    { month: "May", Students: 90, Recruiters: 30 },
    { month: "Jun", Students: 120, Recruiters: 35 },
  ];

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/jobs");
    }
  };

  return (
     <section className="relative mt-4 sm:mt-8 bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] overflow-hidden">
    {/* Decorative Blobs */}
    <div className="relative isolate px-2 sm:px-6 pt-10 sm:pt-14 lg:px-8">
      {/* Flex container for hero and chart */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-8 sm:py-16 gap-8 sm:gap-12">
        {/* Left: Hero Section */}
        <div className="w-full lg:w-1/2">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-6 drop-shadow">
              Find Your <span className="text-[#F83002]">Dream Job</span>
              <br className="hidden lg:block" />
              <span className="ml-2 mr-2">With</span>
              <span className="text-indigo-600">Job Hive</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base xs:text-lg sm:text-xl text-gray-600 font-medium max-w-xl mx-auto lg:mx-0">
              Discover thousands of opportunities, connect with top companies,
              and take the next step in your career journey. Your future
              starts here!
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4">
              <form
                className="relative w-full max-w-md"
                onSubmit={handleSubmitQuery}
              >
                <input
                  type="text"
                  placeholder="Find your dream jobs"
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full py-2 sm:py-3 pl-4 sm:pl-5 pr-28 sm:pr-32 rounded-full border border-gray-200 shadow focus:ring-2 focus:ring-[#F83002] focus:outline-none text-base transition"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#F83002] hover:bg-[#d72600] text-white px-4 sm:px-6 py-2 font-semibold flex items-center gap-2 shadow transition cursor-pointer w-auto sm:w-auto"
                >
                  <Search className="h-5 w-5" />
                  <span className="hidden xs:inline">Search</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
        {/* Right: Chart Section */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-[#F83002]">
              Monthly Registrations
            </h2>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              See how many students and recruiters joined Job Hive each month.
            </p>
            <div className="w-full h-56 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={registrationData} className="w-full">
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#555" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, background: "#f3e8ff" }}
                    labelStyle={{ color: "#F83002", fontWeight: "bold" }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar
                    dataKey="Students"
                    fill="#6366f1"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="Recruiters"
                    fill="#F83002"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;
