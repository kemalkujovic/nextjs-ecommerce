import { type Product } from "@/types";

type CarouselFeaturedProps = {
  data: Product[];
};

const CarouselFeatured = ({ data }: CarouselFeaturedProps) => {
  console.log(data);
  return <div>CarouselFeatured</div>;
};

export default CarouselFeatured;
