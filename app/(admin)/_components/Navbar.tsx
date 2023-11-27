import Logo from "@/app/components/Logo";
import React from "react";
import CreateButton from "./create-button";

const Navbar = () => {
  return (
    <nav className="z-50 fixed bg-neutral-800 w-full h-14 flex items-center justify-between px-4 border-b border-b-gray-600">
      <div className="flex items-center gap-x-2">
        <Logo />
        <p className="text-white">ADMIN PANEL</p>
      </div>
      <div className="flex items-center gap-x-4">
        <CreateButton />
        <p className="text-white">PROFILE</p>
      </div>
    </nav>
  );
};

export default Navbar;
