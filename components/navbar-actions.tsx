"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full hover:bg-neutral-600 bg-neutral-800 px-4 py-4"
      >
        <ShoppingCartIcon fontSize="small" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
