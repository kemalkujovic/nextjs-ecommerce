import axios from "axios";

export async function getProduct(productId: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}`
  );

  return res.data;
}

export async function getProducts() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/`);

  return res.data;
}
