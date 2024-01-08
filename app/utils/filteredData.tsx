import { Product } from "@/types";

const filteredData = (params: any, data: Product[]) => {
  const getPriceForSorting = (product: Product) => {
    return product.finalPrice && product.finalPrice > 0
      ? product.finalPrice
      : product.price;
  };

  if (params.sort === "price-low-to-high") {
    data.sort(
      (a: any, b: any) => +getPriceForSorting(a) - +getPriceForSorting(b)
    );
  } else if (params.sort === "price-high-to-low") {
    data.sort(
      (a: any, b: any) => +getPriceForSorting(b) - +getPriceForSorting(a)
    );
  } else if (params.sort === "latest-arrivals") {
    data.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (params.price) {
    const filteredPrice = data.filter((product: Product) => {
      if (product.finalPrice && product.finalPrice > 0) {
        return +product.finalPrice <= +params.price;
      } else {
        return +product.price <= +params.price;
      }
    });
    return filteredPrice;
  }

  if (params.q) {
    const filteredSearch = data.filter((product: Product) =>
      product.title.toLowerCase().includes(params.q)
    );
    return filteredSearch;
  }

  return data;
};

export default filteredData;
