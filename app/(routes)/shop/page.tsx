import ProductCard from "@/components/ui/product-card";
import { getAllProducts } from "@/lib/apiCalls";

export const metadata = {
  title: "Shop | Kemal Store",
  description: `Shop for e-ecommerce, selling products, and new productivity`,
};

const ShopPage = async () => {
  const data = await getAllProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {data?.map((product: any) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ShopPage;
