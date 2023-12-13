"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ChangeEvent } from "react";

const SidebarItems = ({ category }: any) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    router.push(`${selectedCategory}`);
  };



  return (
    <>
      <select
        onChange={handleSelectChange}
        className="w-full p-2 border border-neutral-800 mt-2 text-sm font-serif sm:hidden"
        value={pathName}
      >
        <option value="/shop">All</option>
        {category?.map((category: any) => (
          <option key={category.id} value={`/shop/${category.category}`}>
            {category.category[0].toUpperCase() + category.category.slice(1)}
          </option>
        ))}
      </select>
      <div className="hidden sm:block">
        <Link href="/shop">
          <p
            className={`w-full  hover:underline underline-offset-4 tracking-widest font-serif ${
              pathName === "/shop" ? "underline" : ""
            }`}
          >
            All
          </p>
        </Link>
        {category?.map((category: any) => (
          <Link key={category.id} href={`/shop/${category.category}`}>
            <p
              className={`w-full   hover:underline underline-offset-4 tracking-widest font-serif ${
                pathName === "/shop/" + category.category ? "underline" : ""
              }`}
            >
              {category.category[0].toUpperCase() + category.category.slice(1)}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SidebarItems;
