import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setLoading, setUser } from "@/store/Slices/auth.slice";
import { Loader2 } from "lucide-react";
import { USER_API_ENDPOINT } from "../../utils/api.constant.js";

const Login = () => {
  const { loading } = useSelector((state) => state?.auth);
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("role", data?.role);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setUser(res?.data?.user));
        navigate("/");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
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
            Login
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Login your Job Hive account
          </p>
          <div className="mb-4">
            <Label className="mb-2 block text-gray-700 font-semibold">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="email@gmail.com"
              onChange={handleChange}
              value={data.email}
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
              onChange={handleChange}
              value={data.password}
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
              Login
            </Button>
          )}

          <p className="text-center text-sm text-gray-500 mt-4">
            If you don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#F83002] hover:underline font-semibold"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
