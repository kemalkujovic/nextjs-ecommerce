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
  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={`${baseUrl}${data.imageURLs[0]}`}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
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
        <div className="font-semibold">${data.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
