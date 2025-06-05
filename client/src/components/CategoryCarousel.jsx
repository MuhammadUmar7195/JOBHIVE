import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Button } from "../components/ui/button";
import { Briefcase, Code, Database, Image, Layers } from "lucide-react";

const category = [
  {
    name: "Frontend Developer",
    icon: <Code className="w-6 h-6 text-indigo-500" />,
  },
  {
    name: "Backend Developer",
    icon: <Database className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Data Science",
    icon: <Layers className="w-6 h-6 text-green-500" />,
  },
  {
    name: "Graphic Designer",
    icon: <Image className="w-6 h-6 text-pink-500" />, 
  },
  {
    name: "FullStack Developer",
    icon: <Briefcase className="w-6 h-6 text-yellow-500" />,
  },
];

const CategoryCarousel = () => {
  const searchJobHandler = (query) => {
    console.log(`Searching for jobs in category: ${query}`);
  };
  return (
    <div className="w-full max-w-2xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#F83002] tracking-tight">
        Explore Categories
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={cat.name}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <div
                className={`bg-gradient-to-br ${cat.color} rounded-2xl shadow-md p-6 flex flex-col items-center gap-3 transition hover:scale-105 duration-200`}
              >
                <div className="mb-2">{cat.icon}</div>
                <Button
                  onClick={() => searchJobHandler(cat.name)}
                  variant="outline"
                  className="rounded-full px-6 py-2 font-semibold border-2 border-[#F83002] text-[#F83002] hover:bg-[#F83002] hover:text-white transition cursor-pointer"
                >
                  {cat.name}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
