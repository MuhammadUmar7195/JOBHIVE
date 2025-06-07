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

const Navbar = () => {
  const { user } = useSelector((state) => state?.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await axios.get(`/api/v1/user/logout`, {
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
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Umar Asif</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start text-sm mt-4">
                  <div className="flex w-fit items-center gap-2">
                    <User2 size={22} />
                    <Button className="cursor-pointer" variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2">
                    <LogOut size={22} />
                    <Button
                      onClick={handleLogout}
                      className="cursor-pointer"
                      variant="link"
                    >
                      Logout
                    </Button>
                  </div>
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
            <li className="hover:text-[#F83002] cursor-pointer py-2 transition">
              Home
            </li>
            <li className="hover:text-[#F83002] cursor-pointer py-2 transition">
              Job
            </li>
            <li className="hover:text-[#F83002] cursor-pointer py-2 transition">
              Browse
            </li>
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
              <div className="flex items-center gap-3 mt-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Umar Asif</div>
                  <div className="flex gap-2 mt-1">
                    <Button className="cursor-pointer" variant="link">
                       <Link to="/profile">View Profile</Link>                
                    </Button>
                    <Button className="cursor-pointer" variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
