import Image from "next/image";

import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import CloseIcon from "@mui/icons-material/Close";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";

  const onRemove = () => {
    cart.removeItem(data);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={`${baseUrl}${data.imageURLs[0]}`}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <button
            onClick={onRemove}
            className="rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.title}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">
              {data.category[0].toUpperCase() + data.category.slice(1)} /{" "}
              {data.size}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-900 font-semibold">
              {data.finalPrice
                ? "$" + data.finalPrice.toFixed(2)
                : `${Number(data?.price).toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
