import { Category, Product } from "@/types";
import axios from "axios";

export async function getProduct(productId: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}`
  );

  return res.data;
}

export async function getCategoryProducts(category: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${category}`
  );

  return res.data;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
  );

  return res.data;
};

export const getCategory = async (category: string): Promise<Category[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/edit/${category}`
  );

  return res.data;
};

export async function getAllProducts() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/`
  );

  return res.data;
}
