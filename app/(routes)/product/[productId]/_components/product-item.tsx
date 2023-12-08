"use client";

import Gallery from "@/components/gallery/gallery";
import Info from "@/components/gallery/info";
import Container from "@/components/ui/container";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

const ProductItem = () => {
  const { productId } = useParams();

  const { isLoading, data, error } = useQuery<Product>({
    queryKey: ["single product"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/product/${productId}`);
      return data;
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={data.imageURLs} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={data} />
            </div>
          </div>
          <hr className="my-10" />
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductItem;
