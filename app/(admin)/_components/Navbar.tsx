import Logo from "@/components/Logo";
import React from "react";
import CreateButton from "./create-button";
import MobileSidebar from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <nav className="z-50 fixed bg-neutral-800 w-full h-14 flex items-center justify-between px-4 border-b border-b-gray-600">
      <div className="flex items-center gap-x-2">
        <Logo />
        <MobileSidebar>
          <Sidebar />
        </MobileSidebar>
        <p className="text-white max-sm:hidden">ADMIN PANEL</p>
      </div>
      <div className="flex items-center gap-x-4">
        <CreateButton />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
