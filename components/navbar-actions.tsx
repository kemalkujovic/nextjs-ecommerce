"use client";

import { useRouter } from "next/navigation";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";

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

  const filteredShop = cart?.items?.map((item) => item.quantity);

  const shopCount = filteredShop?.reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <div className="flex items-center gap-x-4">
      <button
        onClick={() => router.push("/cart")}
        className="flex items-center px-[6px] py-1"
      >
        <Badge
          badgeContent={shopCount}
          color="info"
          max={9}
          sx={{
            "& .MuiBadge-anchorOriginTopRight": {
              background: "#171717",
            },
          }}
        >
          <ShoppingCartIcon style={{ fontSize: "25px" }} />
        </Badge>
      </button>
    </div>
  );
};

export default NavbarActions;
