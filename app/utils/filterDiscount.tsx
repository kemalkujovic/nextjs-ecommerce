import { Product } from "@/types";

const filterDiscountPrice = (data: Product[]) => {
  const res = data.map((product: Product) => {
    if (product.discount && product.discount > 0) {
      const mathDiscount = (product?.discount / 100) * +product.price;
      const price = +product.price - mathDiscount;
      return price;
    } else {
      return +product.price;
    }
  });

  return res;
};
export default filterDiscountPrice;
