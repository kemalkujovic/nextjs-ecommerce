"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Category } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import CardItem from "./gallery/card-item";
import Link from "next/link";

type CategoryProps = {
  data: Category[];
};

export function CarouselSpacing(data: CategoryProps) {
  const formatData = data.data.slice(0, 5);

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
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {formatData.map((category, index) => (
          <CarouselItem
            key={category.id}
            className="max-sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
          >
            <Link href={`/shop/${category.category}`}>
              <CardItem billboard={category.billboardId} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
