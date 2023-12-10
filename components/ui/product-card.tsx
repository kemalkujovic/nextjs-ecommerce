"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  let discount: number = 0;

  if (data?.discount !== undefined && data?.discount > 0) {
    const mathDiscount = (data?.discount / 100) * +data.price;
    discount = +data.price - mathDiscount;
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 relative"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden">
        <Image
          src={`${baseUrl}${data.imageURLs[0]}`}
          alt="Product"
          fill
          className="aspect-square object-cover rounded-md opacity-0 hover:opacity-100 transform scale-100 hover:scale-110 duration-300 transition-all"
          onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
            event.currentTarget.classList.remove("opacity-0")
          }
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center"></div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.title}</p>
        <p className="text-sm text-gray-500">{data.category}</p>
      </div>
      <div className="flex items-center justify-between">
        {discount > 0 ? (
          <div className="font-semibold">
            ${Number(discount).toFixed(2)}{" "}
            <span className="text-gray-500 line-through">
              ${Number(data?.price).toFixed(2)}
            </span>
            <div className="absolute top-2.5 right-2 bg-red-600 text-sm text-white p-1 px-3 font-semibold rounded-sm">
              -{data?.discount}%
            </div>
          </div>
        ) : (
          <div className="font-semibold">${Number(data?.price).toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
