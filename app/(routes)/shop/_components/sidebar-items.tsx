"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItems = ({ category }: any) => {
  const pathName = usePathname();

  return (
    <>
      <Link
        href="/shop"
        className={`text-sm ${pathName === "/shop" ? "underline" : ""}`}
      >
        All
      </Link>
      {category?.map((category: any) => {
        return (
          <Link
            key={category.id}
            href={`/shop/${category.category}`}
            className={`text-sm ${
              pathName === "/shop/" + category.category ? "underline" : ""
            }`}
          >
            {category.category[0].toUpperCase() + category.category.slice(1)}
          </Link>
        );
      })}
    </>
  );
};

export default SidebarItems;
