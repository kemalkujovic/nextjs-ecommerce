import Logo from "@/app/components/Logo";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed bg-neutral-800 w-full h-14 flex items-center justify-between px-4 border-b border-b-gray-600">
      <Logo />
      <p>PROFILE</p>
    </nav>
  );
};

export default Navbar;
