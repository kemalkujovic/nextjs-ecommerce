"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
          delay: 2500,
        }),
      ]}
      className="w-full relative"
    >
      <CarouselPrevious className="absolute z-50 left-6 w-min h-min text-xl p-4" />
      <CarouselNext className="absolute z-50 w-min h-min right-4 text-xl p-4" />
      <CarouselContent className="-ml-1">
        {formatData.map((category, index) => (
          <CarouselItem
            key={category.id}
            className="max-sm:basis-3/4 md:basis-1/2 lg:basis-1/3"
          >
            <Link href={`/shop/${category.category}`}>
              <CardItem
                billboard={category.billboardId}
                category={category.category}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
