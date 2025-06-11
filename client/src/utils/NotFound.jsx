import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff]">
      <Navbar/>
      <img
        src="/10740175.jpg"
        alt="Not found"
        className="rounded-xl shadow-lg mb-6 w-84 h-64"
      />
      <Link to="/" className="text-[#7209b7] underline text-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;