import { CarouselSpacing } from "@/components/CarouselSpacing";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

const HomePage = async () => {
  return (
    <>
      <Container>
        <Billboard />
      </Container>
      <CarouselSpacing />
    </>
  );
};

export default HomePage;
