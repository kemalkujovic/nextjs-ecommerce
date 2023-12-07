"use client";
import SearchBar from "material-ui-search-bar";
const NavbarSearch = () => {
  return (
    <div className="flex mx-auto">
      <SearchBar
        placeholder="Search for products..."
        style={{ height: "38px" }}
        className="w-96 max-md:w-auto h-8 mr-1"
      />
    </div>
  );
};

export default NavbarSearch;
