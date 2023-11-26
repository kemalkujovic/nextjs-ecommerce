import Logo from "@/app/components/Logo";
import React from "react";
import CreateButton from "./create-button";

const Navbar = () => {
  return (
    <nav className="fixed bg-neutral-800 w-full h-14 flex items-center justify-between px-4 border-b border-b-gray-600">
      <Logo />
      <div className="flex items-center gap-x-4">
        <CreateButton />
        <p>PROFILE</p>
      </div>
    </nav>
  );
};

export default Navbar;
