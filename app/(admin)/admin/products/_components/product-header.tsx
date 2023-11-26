"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductItem = () => {
  const [product, setProduct] = useState<boolean>(false);

  const onClickHandler = () => {
    setProduct(true);
  };

  return (
    <div className="bg-zinc-100 mb-3 flex justify-between p-2 items-center">
      <div>
        <p>Create new Product</p>
      </div>
      <div>
        <Button onClick={onClickHandler} size="sm" className="bg-green-600">
          Create Product
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
