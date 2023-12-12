import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import { getCategoryProducts } from "@/lib/apiCalls";
import { Product } from "@/types";

const SearchPage = async ({ params }: { params: { category: string } }) => {
  const data = await getCategoryProducts(params.category);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {data?.map((product: Product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default SearchPage;
