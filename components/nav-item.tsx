"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "Featured",
      href: "/featured",
    },
  ];

  return (
    <div className="flex items-center gap-2 mx-2 max-md:flex-col max-md:items-start max-md:mt-3">
      {routes.map((route) => {
        return (
          <Link key={route.label} href={route.href} className="p-2 max-md:p-0">
            <p
              className={`max-md:text-yellow-50 font-serif text-gray-600 text-l max-md:text-xl hover:text-gray-300 ${
                pathname === route.href && "font-semibold"
              }`}
            >
              {route.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavItem;
