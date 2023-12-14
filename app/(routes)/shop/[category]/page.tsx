import filteredData from "@/app/utils/filteredData";
import ProductCard from "@/components/ui/product-card";
import { siteConfig } from "@/config/site";
import { getCategoryProducts } from "@/lib/apiCalls";
import { Product } from "@/types";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const data = await getCategoryProducts(params.category);

  if (!data)
    return {
      title: "Kemal Store",
      description: "E-ecommerce, selling products, and new productivity",
    };

  return {
    title: `${
      data[0].category[0].toUpperCase() + data[0].category.slice(1)
    } | ${siteConfig.name}`,
    description: data[0].description,
  };
}

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = await getCategoryProducts(params.category);
  let filtered: Product[] | undefined;
  if (searchParams.sort || searchParams.price) {
    filtered = filteredData(searchParams, data);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {(filtered || data)?.map((product: Product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
