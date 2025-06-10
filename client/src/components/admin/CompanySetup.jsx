import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_END_POINT } from "@/utils/api.constant";
import axios from "axios";
import toast from "react-hot-toast";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  useGetAllCompanies();

  const navigate = useNavigate();
  const params = useParams();
  const { companies } = useSelector((state) => state?.company);

  
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  
  const changeEventHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setData({ ...data, file });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("website", data?.website);
    formData.append("location", data?.location);
    if (data?.file) {
      formData.append("file", data?.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (companies && params.id) {
      const company = companies.find((c) => c._id === params.id);
      if (company) {
        setData({
          name: company.name || "",
          description: company.description || "",
          website: company.website || "",
          location: company.location || "",
          file: null, 
        });
      }
    }
  }, [companies, params.id]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff] pb-6">
      <Navbar />
      <div className="max-w-2xl mx-auto px-2 sm:px-4 mt-16">
        <form
          onSubmit={submitHandler}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-8"
        >
          <div className="mt-4 sm:mt-8 ml-0 sm:ml-3 mr-0 sm:mr-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <Button
                type="button"
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="flex items-center gap-2 text-gray-500 font-semibold cursor-pointer"
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
              <h1 className="font-extrabold text-xl sm:text-2xl text-[#F83002] tracking-tight uppercase sm:ml-24">
                Company Setup
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label className="mb-1 block text-gray-700 font-semibold">
                  Company Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={data?.name}
                  onChange={changeEventHandler}
                  placeholder="e.g. JobHive"
                  className="mb-4"
                />
              </div>
              <div>
                <Label className="mb-1 block text-gray-700 font-semibold">
                  Description
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={data?.description}
                  onChange={changeEventHandler}
                  placeholder="Short company description"
                  className="mb-4"
                />
              </div>
              <div>
                <Label className="mb-1 block text-gray-700 font-semibold">
                  Website
                </Label>
                <Input
                  type="text"
                  name="website"
                  value={data?.website}
                  onChange={changeEventHandler}
                  placeholder="https://yourcompany.com"
                  className="mb-4"
                />
              </div>
              <div>
                <Label className="mb-1 block text-gray-700 font-semibold">
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={data?.location}
                  onChange={changeEventHandler}
                  placeholder="City, Country"
                  className="mb-4"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="mb-1 block text-gray-700 font-semibold">
                  Logo
                </Label>
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                  {/* Hidden file input */}
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden"
                  />
                  {/* Custom upload button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 cursor-pointer text-[#F83002] hover:bg-[#F83002] hover:text-white"
                    onClick={() =>
                      document.getElementById("logo-upload").click()
                    }
                  >
                    <UploadCloud className="w-4 h-4" />
                    Upload Logo
                  </Button>
                  {/* Show file name and preview if file is selected */}
                  {data.file && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {data.file.name}
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="px-2 py-1 cursor-pointer"
                        onClick={() =>
                          window.open(URL.createObjectURL(data.file), "_blank")
                        }
                      >
                        View
                      </Button>
                      <img
                        src={URL.createObjectURL(data.file)}
                        alt="Logo Preview"
                        className="w-10 h-10 rounded-full border object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {loading ? (
              <Button className="w-full my-6" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-6 bg-[#F83002] hover:bg-[#d72600] text-white font-bold text-lg rounded-lg shadow transition cursor-pointer"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
