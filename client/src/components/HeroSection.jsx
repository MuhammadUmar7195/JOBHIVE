import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const HeroSection = () => {
  const registrationData = [
    { month: "Jan", Students: 40, Recruiters: 10 },
    { month: "Feb", Students: 60, Recruiters: 18 },
    { month: "Mar", Students: 80, Recruiters: 25 },
    { month: "Apr", Students: 65, Recruiters: 22 },
    { month: "May", Students: 90, Recruiters: 30 },
    { month: "Jun", Students: 120, Recruiters: 35 },
  ];

  return (
    <section className="relative mt-8 bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] overflow-hidden">
      {/* Decorative Blobs */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Flex container for hero and chart */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 gap-12">
          {/* Left: Hero Section */}
          <div className="w-full lg:w-1/2">          
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 drop-shadow">
                Find Your <span className="text-[#F83002]">Dream Job</span>
                <br className="hidden lg:block" />
                <span className="ml-2 mr-2">With</span><span className="text-indigo-600">Job Hive</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 font-medium max-w-xl mx-auto lg:mx-0">
                Discover thousands of opportunities, connect with top companies,
                and take the next step in your career journey. Your future
                starts here!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Link
                  to="/login"
                  className="rounded-lg bg-[#F83002] px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-[#d72600] transition"
                >
                  Get Started
                </Link>
                <Link
                  to="#"
                  className="text-lg font-semibold text-indigo-600 hover:underline flex items-center gap-1 mt-3"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          {/* Right: Chart Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-4 text-[#F83002]">
                Monthly Registrations
              </h2>
              <p className="text-center text-gray-500 mb-6">
                See how many students and recruiters joined Job Hive each month.
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={registrationData} className="w-full">
                  <XAxis dataKey="month" tick={{ fontSize: 14 }} />
                  <YAxis tick={{ fontSize: 14 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, background: "#f3e8ff" }}
                    labelStyle={{ color: "#F83002", fontWeight: "bold" }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="Students" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Recruiters" fill="#F83002" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Decorative Blob */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;