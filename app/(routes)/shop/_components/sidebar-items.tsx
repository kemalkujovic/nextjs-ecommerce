"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItems = ({ category }: any) => {
  const pathName = usePathname();

  return (
    <>
      <Link
        href="/shop"
        className={`w-full text-sm  hover:underline underline-offset-4 tracking-widest font-serif ${
          pathName === "/shop" ? "underline" : ""
        }`}
      >
        All
      </Link>
      {category?.map((category: any) => {
        return (
          <Link
            key={category.id}
            href={`/shop/${category.category}`}
            className={`w-full text-sm  hover:underline underline-offset-4 tracking-widest font-serif ${
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
