"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NavbarSearch = () => {
  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchStr = searchParams.get("q");

  const handleSearchChange = async () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (search.length >= 1) {
      current.set("q", search);
    } else {
      current.delete("q");
      await router.replace("/shop");
    }

    const searchq = current.toString();
    const query = searchq ? `?${searchq}` : "";

    await router.replace(`/shop/${query}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearchChange();
    }
  };

  useEffect(() => {
    if (pathname !== "/shop") setSearch("");
  }, [pathname]);

  useEffect(() => {
    if (searchStr) setSearch(searchStr);
  }, [searchStr, setSearch]);

  return (
    <div className="flex mx-auto relative">
      <Input
        size={35}
        className="pr-12 outline-none rounded-xl max-md:text-white bg-transparent"
        placeholder="Search for products..."
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        value={search}
      />
      <SearchIcon
        size={20}
        className="absolute right-0 mr-4 top-1/2 transform -translate-y-1/2"
        onClick={handleSearchChange}
      />
    </div>
  );
};

export default NavbarSearch;
