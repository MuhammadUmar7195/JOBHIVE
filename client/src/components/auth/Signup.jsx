import React, { useState } from "react";
import NavBar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/Slices/auth.slice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { loading } = useSelector((state) => state?.auth);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const fileHandleChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, [e.target.name]: e.target.file?.[0] });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", data?.fullname);
    formData.append("email", data?.email);
    formData.append("phoneNumber", data?.phoneNumber);
    formData.append("password", data?.password);
    formData.append("role", data?.role);
    if (data?.file) {
      formData.append("file", data?.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="mt-8">
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff]">
        <NavBar />
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl p-8 my-12"
          >
            <h1 className="font-extrabold text-3xl text-center mb-2 text-[#F83002] tracking-tight">
              Sign Up
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Create your Job Hive account
            </p>
            <div className="mb-4">
              <Label className="mb-2 block text-gray-700 font-semibold">
                Full Name
              </Label>
              <Input
                type="text"
                name="fullname"
                placeholder="John Doe"
                value={data.fullname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              />
            </div>
            <div className="mb-4">
              <Label className="mb-2 block text-gray-700 font-semibold">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="email@gmail.com"
                value={data.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              />
            </div>
            <div className="mb-4">
              <Label className="mb-2 block text-gray-700 font-semibold">
                Phone Number
              </Label>
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="Phone number"
                value={data?.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              />
            </div>
            <div className="mb-4">
              <Label className="mb-2 block text-gray-700 font-semibold">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002] transition"
              />
            </div>
            <div className="mb-6">
              <Label className="mb-2 block text-gray-700 font-semibold">
                Register as
              </Label>
              <RadioGroup defaultValue="student" className="flex gap-8">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={data.role == "student"}
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1" className="cursor-pointer">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={data.role == "recruiter"}
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2" className="cursor-pointer">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex flex-col gap-2 mt-4">
                <Label className="text-gray-700 font-semibold mb-1">
                  Profile Picture
                </Label>
                <div className="relative w-full">
                  <Input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    onChange={fileHandleChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="profile-picture"
                    className="inline-flex items-center px-4 py-2 bg-violet-100 text-red-600 font-semibold text-sm rounded cursor-pointer transition hover:bg-violet-200"
                  >
                    Upload Image
                  </Label>
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Selected Profile"
                        className="w-32 h-32 object-cover rounded border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {loading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin">
                  {" "}
                  Please wait...
                </Loader2>{" "}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#F83002] hover:bg-[#d72600] text-white font-bold py-2 rounded-lg transition cursor-pointer"
              >
                Create Account
              </Button>
            )}
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#F83002] hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
