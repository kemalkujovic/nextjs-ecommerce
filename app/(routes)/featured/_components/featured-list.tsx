"use client";

import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FeautredList = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/product/`);
      const featuredData = data.filter((item: Product) => item.featured);
      return featuredData as Product[];
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default FeautredList;
