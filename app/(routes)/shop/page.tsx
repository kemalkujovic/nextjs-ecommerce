import ProductCard from "@/components/ui/product-card";
import { getAllProducts } from "@/lib/apiCalls";
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
  let searchMsg;

  let filtered: Product[] | undefined;

  if (searchParams.sort || searchParams.price) {
    filtered = filteredData(searchParams, data);
  }

  if (searchParams.q) {
    filtered = filteredData(searchParams, data);
  }

  if (searchParams.q && filtered && filtered.length <= 0) {
    return (
      <p className="font-serif text-lg">
        There are no products that match{" "}
        <span className="font-bold">{`"${searchParams.q}"`}</span>
      </p>
    );
  }

  if (searchParams.q && filtered && filtered.length > 0) {
    searchMsg = (
      <p className="font-serif text-lg mb-3">
        Showing {filtered.length} results for{" "}
        <span className="font-bold">{`"${searchParams.q}"`}</span>
      </p>
    );
  }

  return (
    <>
      {searchMsg ? searchMsg : ""}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {(filtered || data)?.map((product: any) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
};

export default ShopPage;
