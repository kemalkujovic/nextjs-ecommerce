import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  return (
    <Container>
      <Billboard />
    </Container>
  );
};

export default HomePage;
