import Container from "@/components/ui/container";
import FeautredList from "./_components/featured-list";

export const metadata = {
  title: "Featured | Kemal Store",
  description: `Featured for e-ecommerce, selling products, and new productivity`,
};

const FeaturedPage = () => {
  return (
    <Container>
      <div className="flex flex-col gap-y-8 mt-2 px-4 sm:px-6 lg:px-8">
        <FeautredList />
      </div>
    </Container>
  );
};

export default FeaturedPage;
