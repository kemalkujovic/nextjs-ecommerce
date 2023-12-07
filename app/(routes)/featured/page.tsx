import Container from "@/components/ui/container";
import FeautredList from "./_components/featured-list";

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
