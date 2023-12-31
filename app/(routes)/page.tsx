import CarouselFeatured from "@/components/CarouselFeatured";
import { CarouselSpacing } from "@/components/CarouselSpacing";
import TitleHeader from "@/components/title-header";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { getAllProducts, getCategories } from "@/lib/apiCalls";
import { Product } from "@/types";

const HomePage = async () => {
  const category = await getCategories();
  const products = await getAllProducts();

  const featuredProducts = products.filter(
    (product: Product) => product.featured
  );

  return (
    <>
      <Container>
        <Billboard />
      </Container>
      <TitleHeader title="Top Category" url="/shop" />
      <CarouselSpacing data={category} />
      {featuredProducts.length > 0 && <CarouselFeatured data={products} />}
    </>
  );
};

export default HomePage;
