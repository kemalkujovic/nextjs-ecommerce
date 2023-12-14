import ProductCard from "@/components/ui/product-card";
import { getAllProducts } from "@/lib/apiCalls";
import SortItems from "./_components/sort-items";
import filteredData from "@/app/utils/filteredData";
import { Product } from "@/types";

export const metadata = {
  title: "Shop | Kemal Store",
  description: `Shop for e-ecommerce, selling products, and new productivity`,
};

const ShopPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const data = await getAllProducts();

  let filtered: Product[] | undefined;

  if (searchParams.sort || searchParams.price) {
    filtered = filteredData(searchParams, data);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {(filtered || data)?.map((product: any) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
};

export default ShopPage;
