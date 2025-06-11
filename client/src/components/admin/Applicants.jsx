import { setAllApplicants } from "@/store/Slices/application.slice";
import { APPLICATION_API_ENDPOINT } from "@/utils/api.constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApplicantsTable from "./ApplicantsTable";
import Navbar from "../shared/Navbar";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store?.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res?.data?.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-8">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-16 px-2 sm:px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-8">
            <h1 className="text-2xl font-extrabold text-[#F83002] tracking-tight">
              Applicants{" "}
              <span className="bg-[#f3e8ff] text-[#7209b7] px-3 py-1 rounded-full text-base ml-2">
                {applicants?.applications?.length || 0}
              </span>
            </h1>
            <p className="text-gray-500 text-base">
              Review and manage all applicants for this job.
            </p>
          </div>
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;