import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection.jsx";
import CategoryCarousel from "./CategoryCarousel";
import LatestJob from "./LatestJob";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJob/>
    </div>
  );
};

export default Home;
