"use client";
import { ShoppingCart } from "lucide-react";

import { Category, Product } from "@/types";
import { Button } from "../ui/button";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
  categories: Category[];
  availableSizes: Category[];
}

const Info: React.FC<InfoProps> = ({ data, categories, availableSizes }) => {
  const isSizeAvailable = (sizeId: string) => {
    return availableSizes.some((size: any) => size.sizeId === sizeId);
  };
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        {data.finalPrice && data.finalPrice > 0 ? (
          <div className="font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through">
                ${Number(data?.price).toFixed(2)}
              </span>
              <div className=" bg-red-600 text-sm text-white  p-1 px-1 font-semibold rounded-sm">
                -{data?.discount}%
              </div>
            </div>
            <p className="text-2xl text-gray-900 font-semibold mt-1">
              ${data.finalPrice.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="text-2xl text-gray-900 font-semibold">
            ${Number(data?.price).toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-x-4 mt-3">
        <span className="text-sm font-serif text-[#4a4a4a]">
          {data?.description}
        </span>
      </div>
      <div className="flex mt-2 flex-wrap gap-2 flex-col">
        <span className="text-xl font-semibold py-2 text-gray-900">Size</span>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category: any) => {
            const isSizeAvailableInCategory = isSizeAvailable(category.id);
            return (
              <Button
                type="button"
                className={`${
                  isSizeAvailableInCategory
                    ? ""
                    : "disabled:pointer-events-auto relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform hover:bg-transparent"
                } flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm`}
                key={category.id}
                disabled={!isSizeAvailableInCategory}
              >
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6"></div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
