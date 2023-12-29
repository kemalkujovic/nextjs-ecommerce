import { CarouselSpacing } from "@/components/CarouselSpacing";
import TitleHeader from "@/components/title-header";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { getCategories } from "@/lib/apiCalls";

const HomePage = async () => {
  const category = await getCategories();

  return (
    <>
      <Container>
        <Billboard />
      </Container>
      <TitleHeader title="Top Category" url="/shop" />
      <CarouselSpacing data={category} />
    </>
  );
};

export default HomePage;
