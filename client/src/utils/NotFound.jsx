import Navbar from "@/components/shared/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff7f4] via-[#f3e8ff] to-[#f7faff]">
      <Navbar />
      <h1 className="text-7xl font-extrabold text-[#F83002] mb-4 mt-12 text-center drop-shadow-lg">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Oops! Page not found.
      </p>
      <Link to="/" className="text-[#7209b7] underline text-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
