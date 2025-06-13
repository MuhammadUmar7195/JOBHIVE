import { USER_API_ENDPOINT } from "@/utils/api.constant";
import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [data, setData] = useState({ email: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/forgot-password`,
        { email: data.email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success("OTP sent to your email");
        setOtpLoading(true);
      } else {
        toast.error(res?.data?.message || "Failed to send OTP");
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

  const handleOtpChange = async (e) => {
    const otp = e.target.value.replace(/\D/g, ""); // Only digits
    setData({ ...data, otp });
    if (otp.length === 6) {
      setVerifying(true);
      try {
        const res = await axios.post(
          `${USER_API_ENDPOINT}/verify-otp`,
          { email: data.email, otp },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          toast.success("OTP verified! You can now reset your password.");
          localStorage.setItem("resetEmail", data?.email)
          navigate("/reset-password");
        } else {
          toast.error(res?.data?.message || "OTP verification failed");
        }
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "OTP verification failed. Please try again.";
        toast.error(msg);
      } finally {
        setVerifying(false);
      }
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff]">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleForgot}
          className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl p-8 my-12"
        >
          <h1 className="font-extrabold text-3xl text-center mb-2 text-[#F83002] tracking-tight">
            Forgot Password
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Enter your email and we'll send 6 Digits code.
          </p>
          <div className="mb-6">
            <Label className="mb-2 block text-gray-700 font-semibold">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="email@gmail.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              disabled={otpLoading}
            />
          </div>
          {otpLoading && (
            <div className="mb-6">
              <Label className="mb-2 block text-gray-700 font-semibold">
                OTP
              </Label>
              <Input
                type="text"
                name="otp"
                placeholder="6-Digits code"
                value={data?.otp}
                onChange={handleOtpChange}
                maxLength={6}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition tracking-widest text-center"
                autoFocus
                disabled={verifying}
              />
              {verifying && (
                <div className="flex justify-center mt-2">
                  <Loader2 className="h-5 w-5 animate-spin text-[#F83002]" />
                  <span className="ml-2 text-[#F83002]">Verifying...</span>
                </div>
              )}
            </div>
          )}
          {!otpLoading &&
            (loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#F83002] hover:bg-[#d72600] text-white font-bold py-2 rounded-lg transition cursor-pointer"
              >
                Send Reset Link
              </Button>
            ))}
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

export default ForgotPassword;
