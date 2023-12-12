"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type SortItemsProps = {
  count: number;
};

const SortItems: React.FC<SortItemsProps> = ({ count }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<string>("Relevance");

  const handleSortChange = useCallback(
    async (value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!value || value === "Relevance") {
        current.delete("sort");
      } else {
        current.set("sort", value);
      }
      const search = current.toString();
      const query = search ? `?${search}` : "";

      await router.push(`${pathName}${query}`);

      setSelectedSort(value);
    },
    [searchParams, pathName, router]
  );

  useEffect(() => {
    handleSortChange(selectedSort);
  }, [selectedSort, handleSortChange]);

  return (
    <div className="flex items-center mb-4">
      <p className="font-semibold text-sm">{count} Products found</p>
      <div className="flex-grow h-0.5 bg-neutral-800 mx-5"></div>
      <div className="flex items-center">
        <p className="font-semibold text-sm">Sort by</p>
        <select
          className="ml-2 border border-neutral-800 p-1 text-sm"
          name="sorting"
          id=""
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="latest-arrivals">Latest arrivals</option>
          <option value="price-low-to-high">Low to high</option>
          <option value="price-high-to-low">High to low</option>
        </select>
      </div>
    </div>
  );
};

export default SortItems;
