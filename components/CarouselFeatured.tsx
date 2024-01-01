"use client";
import { type Product } from "@/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "./ui/product-card";

type CarouselFeaturedProps = {
  data: Product[];
};

const CarouselFeatured = ({ data }: CarouselFeaturedProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full relative"
    >
      <CarouselPrevious className="absolute z-50 left-7 w-min h-min text-xl p-4 top-[45%]" />
      <CarouselNext className="absolute z-50 w-min h-min right-4 text-xl top-[45%] p-4" />
      <CarouselContent className="-ml-1">
        {data.map((product, index) => (
          <CarouselItem
            key={product.id}
            className="max-sm:basis-3/4 md:basis-1/2 lg:basis-1/3"
          >
            <ProductCard data={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselFeatured;
