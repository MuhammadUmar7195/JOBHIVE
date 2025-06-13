import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { USER_API_ENDPOINT } from "@/utils/api.constant";
import axios from "axios";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const resetEmail = localStorage.getItem("resetEmail");
    if (!resetEmail) {
      navigate("/forgot-password");
    } else {
      setData((prev) => ({ ...prev, email: resetEmail }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/reset-password`,
        {
          email: data.email,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success("Your password reset successfully");
        localStorage.removeItem("resetEmail");
        navigate(`/login`);
      } else {
        toast.error(res?.data?.message || "Verify again, Something wrong");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff]">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl p-8 my-12"
        >
          <h1 className="font-extrabold text-3xl text-center mb-2 text-[#F83002] tracking-tight">
            Reset Password
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Enter your email and set a new password.
          </p>
          <div className="mb-4">
            <Label className="mb-2 block text-gray-700 font-semibold">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="email@gmail.com"
              onChange={handleChange}
              value={data?.email}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="mb-2 block text-gray-700 font-semibold">
              New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              value={data?.newPassword}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="mb-2 block text-gray-700 font-semibold">
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={data?.confirmPassword}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              required
            />
          </div>
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#F83002] hover:bg-[#d72600] text-white font-bold py-2 rounded-lg transition cursor-pointer"
            >
              Reset Password
            </Button>
          )}
          <div className="flex justify-center mt-4">
            <Link
              to="/login"
              className="text-sm text-[#6A38C2] hover:underline font-semibold transition"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
