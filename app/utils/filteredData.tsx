import { Product } from "@/types";

const filteredData = (params: any, data: Product[]) => {
  if (params.sort === "price-low-to-high") {
    data.sort((a: any, b: any) => a.price - b.price);
  } else if (params.sort === "price-high-to-low") {
    data.sort((a: any, b: any) => b.price - a.price);
  } else if (params.sort === "latest-arrivals") {
    data.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (params.price) {
    const filteredPrice = data.filter(
      (product: any) => +product.price <= +params.price
    );
    return filteredPrice;
  }

  return data;
};

export default filteredData;
