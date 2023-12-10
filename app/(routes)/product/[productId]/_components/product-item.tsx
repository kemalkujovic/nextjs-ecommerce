"use client";

import Gallery from "@/components/gallery/gallery";
import Info from "@/components/gallery/info";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import { type Product } from "@/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { getCategories } from "@/lib/apiCalls";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ProductItem = () => {
  const [categories, setCategories] = useState([]);
  const { productId } = useParams();

  const [productQuery, relatedQuery] = useQueries({
    queries: [
      {
        queryKey: ["single product"],
        queryFn: async () =>
          await axios.get(`/api/product/${productId}`).then((res) => res.data),
      },
      {
        queryKey: ["related products"],
        queryFn: async () => {
          const response = await axios.get("/api/product/");
          return response.data;
        },
      },
    ],
  });
  const { isLoading, data } = useQuery({
    queryKey: ["product categories", productQuery],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/sizes/${productQuery.data.categoryId}`
      );
      setCategories(data);
      return data;
    },
    enabled: !!productQuery.data?.categoryId,
  });

  if (isLoading || productQuery.isLoading || relatedQuery.isLoading) {
    return (
      <Container>
        <LoadingSkeleton />
      </Container>
    );
  }

  if (!productQuery.data || !relatedQuery.data) {
    return <Container>Something went wrong!</Container>;
  }

  const filteredData: Product[] = relatedQuery?.data?.filter(
    (item: Product) => item.category === productQuery?.data?.category
  );

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-16">
          <Link href="/shop" className="flex items-center mb-5 gap-x-1">
            <ArrowBackIcon style={{ width: "20px", height: "20px" }} />
            <p className="text-md font-semibold">Back to shop</p>
          </Link>
          <div className="lg:grid lg:grid-cols-[500px_minmax(400px,_1fr)_100px] lg:items-start lg:gap-x-8">
            <Gallery images={productQuery.data?.imageURLs} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={productQuery?.data} categories={categories} />
            </div>
          </div>

          <hr className="my-10" />
          <div className="space-y-4">
            <h3 className="font-semibold text-3xl">Recommended</h3>
            <div className="grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:gird-cols-4 gap-4">
              {filteredData?.map((item: Product) => {
                return <ProductCard key={item.id} data={item} />;
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductItem;
