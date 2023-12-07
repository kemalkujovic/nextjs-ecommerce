import { type Product } from "@/types";

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("/api/product/");

  return res.json();
};

export default getProducts;
