import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
const NavbarSearch = () => {
  return (
    <div className="flex mx-auto relative">
      <Input
        size={35}
        className="pr-12 outline-none rounded-xl max-md:text-white bg-transparent"
        placeholder="Search for products..."
      />
      <SearchIcon
        size={20}
        className="absolute right-0 mr-4 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default NavbarSearch;
