"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = () => {
  const pathname = usePathname();
  const user = useUser();

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
    {
      label: "Admin",
      href: "/admin",
    },
  ];

  const isAdmin = user.user && user.user.unsafeMetadata.isAdmin;

  return (
    <div className="flex items-center gap-2 mx-2 max-md:flex-col max-md:items-start max-md:mt-3">
      {routes.map((route) => {
        if (route.label === "Admin" && !isAdmin) {
          return null;
        }
        return (
          <Link key={route.label} href={route.href} className="p-2 max-md:p-0">
            <p
              className={`max-md:text-yellow-50 font-serif text-gray-600 text-l max-md:text-xl hover:text-gray-300  ${
                (pathname === route.href ||
                  pathname.startsWith(`${route.href}/`)) &&
                "font-semibold max-md:underline"
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
