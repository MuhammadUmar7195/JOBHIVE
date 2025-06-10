import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection.jsx";
import CategoryCarousel from "./CategoryCarousel";
import LatestJob from "./LatestJob";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  useGetAllJobs();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  useEffect(() => {
    if(user?.role === "recruiter"){
      navigate("/admin/companies");
    }
  }, [navigate, user]);
  
  return (
    <>
      <Navbar />
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJob/>
      <Footer/>
    </>
  );
};

export default Home;
