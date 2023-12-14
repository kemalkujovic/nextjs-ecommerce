"use client";

import filterDiscountPrice from "@/app/utils/filterDiscount";
import { getCategoryProducts } from "@/lib/apiCalls";
import { Product } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type PriceInputProps = {
  data: Product[];
};

const PriceInput = ({ data }: PriceInputProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [value, setValue] = useState<number>();

  const handleSortChange = useCallback(
    async (value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!value || +value === maxPrice) {
        current.delete("price");
      } else {
        current.set("price", value);
      }
      const search = current.toString();
      const query = search ? `?${search}` : "";

      await router.replace(`${pathName}${query}`);
    },
    [searchParams, pathName, router, maxPrice]
  );

  useEffect(() => {
    const fetchProductPrice = async () => {
      if (pathName.startsWith("/shop/") && pathName !== "/shop") {
        const urlString = pathName.substring("/shop/".length);
        const data = await getCategoryProducts(urlString);
        const prices = filterDiscountPrice(data);

        setMaxPrice(Math.max(...prices));
        setMinPrice(Math.min(...prices));
        setValue(maxPrice);
      } else {
        const prices = filterDiscountPrice(data);
        setMaxPrice(Math.max(...prices));
        setMinPrice(Math.min(...prices));
        setValue(maxPrice);
      }
    };

    fetchProductPrice();
  }, [pathName, data, maxPrice]);

  return (
    <div className="range-container mt-2">
      <div className="range-label flex justify-between">
        <div className="flex flex-col gap-y-1">
          <p className="font-semibold">Price</p>
          <span className="font-serif">${value?.toFixed(2)}</span>
        </div>
      </div>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={value || 0}
        step="0.25"
        onChange={(e) => {
          handleSortChange(e.target.value);
          setValue(parseFloat(e.target.value));
        }}
        className=" accent-neutral-800 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};

export default PriceInput;
