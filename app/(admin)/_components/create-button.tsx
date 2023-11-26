import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CreateButton = () => {
  return (
    <Link href="/admin/products/new">
      <Button size="sm" className="bg-green-600">
        Create Product
      </Button>
    </Link>
  );
};

export default CreateButton;
