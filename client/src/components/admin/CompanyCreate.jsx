import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/api.constant";
import { setSingleCompany } from "@/store/Slices/company.slice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    // Add your registration logic here
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-16">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mt-10">
          <div className="mb-8 text-center">
            <h1 className="font-extrabold text-3xl text-[#F83002] mb-2 tracking-tight">
              Create Your Company
            </h1>
            <p className="text-gray-500 text-base">
              What would you like to name your company? <br />
              <span className="text-xs text-gray-400">
                (You can change this later.)
              </span>
            </p>
          </div>
          <div className="mb-6">
            <Label className="block mb-2 text-gray-700 font-semibold">
              Company Name
            </Label>
            <Input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#F83002] transition"
              placeholder="JobHive, Microsoft, etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Button
              variant="outline"
              className="w-full sm:w-auto cursor-pointer"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto bg-[#F83002] hover:bg-[#d72600] text-white font-bold cursor-pointer"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
