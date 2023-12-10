"use client";

import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-2xl">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image, index) => (
            <GalleryTab image={image} key={index} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image, index) => (
          <Tab.Panel key={index}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <NextImage
                fill
                src={`${baseUrl}${image}`}
                alt="Image"
                className="object-cover object-center opacity-0 duration-300 transition-opacity"
                onLoad={(
                  event: React.SyntheticEvent<HTMLImageElement, Event>
                ) => event.currentTarget.classList.remove("opacity-0")}
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
