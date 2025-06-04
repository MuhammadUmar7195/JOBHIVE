import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  let user;
  return (
    <div className="bg-white w-full">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-16">
        {/* Logo & Text*/}
        <div>
          <h1 className="text-2xl font-extrabold">
            Job <span className="text-[#F83002]">Hive</span>
          </h1>
        </div>
        {/* Nav Links and Avatar */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li className="hover:text-[#F83002] cursor-pointer">Home</li>
            <li className="hover:text-[#F83002] cursor-pointer">Job</li>
            <li className="hover:text-[#F83002] cursor-pointer">Browse</li>
          </ul>

          {!user ? (
            <div className="flex gap-2">

              <Button variant="ouline" className="bg-gray-200 cursor-pointer">
                Login
              </Button>
        
              <Button variant="ouline" className="bg-purple-500 cursor-pointer">
                Signup
              </Button>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start text-sm">
                  <div className="flex w-fit items-center gap-2">
                    <User2 size={22} />
                    <Button className="cursor-pointer" variant="link">
                      View Profile
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2">
                    <LogOut size={22} />
                    <Button className="cursor-pointer" variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
