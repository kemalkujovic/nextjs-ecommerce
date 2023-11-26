"use client";

import CreateButton from "@/app/(admin)/_components/create-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductItem = () => {
  return (
    <>
      <div className="bg-zinc-100 mb-3 flex justify-between p-2 items-center">
        <div>
          <p>Create new Product</p>
        </div>
        <div>
          <CreateButton />
        </div>
      </div>
    </>
  );
};

export default ProductItem;
