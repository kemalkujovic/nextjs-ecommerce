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
        {data?.map((product: Product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
