import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-gray-200 py-8 mt-8">
        <div className="flex flex-row text-sm text-gray-500 items-center justify-center border-t pt-4 ">
          © {new Date().getFullYear()} Job Hive. All rights reserved. 
          <Heart size={15} className="ml-1 fill-red-500 stroke-red-500"/>
        </div>
    </footer>
  );
};

export default Footer;