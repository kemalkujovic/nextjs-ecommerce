import ProductCard from "@/components/ui/product-card";
import { getAllProducts } from "@/lib/apiCalls";
import SortItems from "./_components/sort-items";
import SidebarProducts from "./_components/sidebar-products";

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
  if (searchParams.sort === "price-low-to-high") {
    data.sort((a: any, b: any) => a.price - b.price);
  } else if (searchParams.sort === "price-high-to-low") {
    data.sort((a: any, b: any) => b.price - a.price);
  } else if (searchParams.sort === "latest-arrivals") {
    data.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {data?.map((product: any) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
};

export default ShopPage;
