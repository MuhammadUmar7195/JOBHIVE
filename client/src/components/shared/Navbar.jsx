import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "@/store/Slices/auth.slice.js";
import { USER_API_ENDPOINT } from "../../utils/api.constant.js";; 

const Navbar = () => {
  const { user } = useSelector((state) => state?.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <nav className="bg-white w-full shadow-sm fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-6 h-16">
        {/* Logo */}
        <Link to={`/`} className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Job <span className="text-[#F83002]">Hive</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6">
            <Link
              to="/"
              className="hover:text-[#F83002] cursor-pointer transition"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="hover:text-[#F83002] cursor-pointer transition"
            >
              Job
            </Link>
            <Link
              to="/browse"
              className="hover:text-[#F83002] cursor-pointer transition"
            >
              Browse
            </Link>
          </ul>
          {!user ? (
            <div className="flex gap-2">
              <Link to={`/login`}>
                <Button
                  variant="outline"
                  className="bg-gray-100 border border-gray-200 text-[#F83002] hover:bg-[#F83002] hover:text-white transition cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <Link to={`/signup`}>
                <Button
                  variant="outline"
                  className="bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {user?.fullname
                        ? user.fullname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="justify-start w-full text-[#6A38C2] hover:bg-[#f3e8ff] hover:text-[#F83002] font-semibold gap-2 cursor-pointer"
                  >
                    <Link to="/profile">
                      <User2 size={18} className="mr-2" />
                      View Profile
                    </Link>
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="justify-start w-full text-[#F83002] hover:bg-[#fff0ee] hover:text-[#d72600] font-semibold gap-2 cursor-pointer"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <Button
            className="p-2 rounded-md bg-gray-100 transition cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open Menu"
          >
            <Menu size={28} className="text-[#F83002]" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="flex flex-col font-medium gap-2 px-6 py-4 items-center justify-center">
            <Link
              to="/"
              className="hover:text-[#F83002] cursor-pointer py-2 transition"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="hover:text-[#F83002] cursor-pointer py-2 transition"
            >
              Job
            </Link>
            <Link
              to="/browse"
              className="hover:text-[#F83002] cursor-pointer py-2 transition"
            >
              Browse
            </Link>
          </ul>
          <div className="flex flex-col gap-2 px-6 pb-4">
            {!user ? (
              <>
                <Link to={`/login`}>
                  <Button
                    variant="outline"
                    className="bg-gray-100 border border-gray-200 text-[#F83002] hover:bg-[#F83002] hover:text-white transition cursor-pointer w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={`/signup`}>
                  <Button
                    variant="outline"
                    className="bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer w-full"
                  >
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 mt-4 w-full">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt={user?.fullname || "@user"}
                  />
                  <AvatarFallback>
                    {user?.fullname
                      ? user.fullname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="font-semibold text-base mt-1">
                  {user?.fullname}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {user?.email}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mb-2 bg-gray-100 border border-gray-200 text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition cursor-pointer"
                >
                  <Link to="/profile">View Profile</Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-[#fff0ee] border border-[#ffd6cc] text-[#F83002] hover:bg-[#F83002] hover:text-white transition cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
