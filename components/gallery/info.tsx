import { ShoppingCart } from "lucide-react";

import { Category, Product } from "@/types";
import { Button } from "../ui/button";

interface InfoProps {
  data: Product;
  categories: Category[];
  availableSizes: Category[];
}

const Info: React.FC<InfoProps> = ({ data, categories, availableSizes }) => {
  console.log(availableSizes);
  const isSizeAvailable = (sizeId: string) => {
    return availableSizes.some((size: any) => size.sizeId === sizeId);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900 font-semibold">
          ${Number(data?.price).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-x-4 mt-3">
        <span className="text-sm font-serif text-[#4a4a4a]">
          {data?.description}
        </span>
      </div>
      <div className="flex mt-2 flex-wrap gap-2">
        {categories?.map((category: any) => {
          const isSizeAvailableInCategory = isSizeAvailable(category.id);
          console.log(category);

          return (
            <Button
              className={`${isSizeAvailableInCategory ? "bg-green-500" : ""}`}
              key={category.id}
              disabled={!isSizeAvailableInCategory}
            >
              {category.name}
            </Button>
          );
        })}
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6"></div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
