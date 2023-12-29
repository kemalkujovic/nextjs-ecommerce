import { CarouselSpacing } from "@/components/CarouselSpacing";
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
      <CarouselSpacing data={category} />
    </>
  );
};

export default HomePage;
