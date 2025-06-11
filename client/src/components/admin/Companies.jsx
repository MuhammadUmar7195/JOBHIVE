import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/store/Slices/company.slice";

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-16">
        <Navbar />
        <div className="max-w-6xl mx-auto my-12 mt-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="ml-4">
              <h1 className="text-3xl font-extrabold text-[#F83002] mb-2 tracking-tight mt-10">
                Manage Companies
              </h1>
              <p className="text-gray-500 text-base">
                View, search, and add companies to your platform.
              </p>
            </div>
            <div className="flex gap-3 items-center mt-10">
              <Input
                className="w-64 px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#F83002] transition"
                placeholder="Filter by company name..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                onClick={() => navigate("/admin/companies/create")}
                className="bg-[#F83002] hover:bg-[#d72600] text-white font-bold px-6 py-2 rounded-lg shadow transition cursor-pointer"
              >
                + New Company
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <CompaniesTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
