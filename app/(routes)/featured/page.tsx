import Container from "@/components/ui/container";
import { getFeaturedProducts } from "@/lib/apiCalls";
import filteredData from "@/app/utils/filteredData";
import { Product } from "@/types";
import ProductCard from "@/components/ui/product-card";

export const metadata = {
  title: "Featured | Kemal Store",
  description: `Featured for e-ecommerce, selling products, and new productivity`,
};

const FeaturedPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const data = await getFeaturedProducts();

  let filtered: Product[] | undefined;

  if (searchParams.sort) {
    filtered = filteredData(searchParams, data);
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(filtered || data)?.map((product: Product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeaturedPage;
