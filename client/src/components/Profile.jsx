import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import ViewProfile from "./ViewProfile";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-10">
      <Navbar />
      <main className="w-full max-w-full overflow-x-hidden">
        <ViewProfile setOpen={setOpen} />
        {/* Applied Jobs */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 mt-8 p-6">
          <h2 className="font-bold text-lg mb-4 text-[#F83002]">
            Applied Jobs
          </h2>
          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </main>
    </div>
  );
};

export default Profile;
