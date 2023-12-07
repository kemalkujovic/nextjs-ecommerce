"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavbarActions = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full hover:bg-neutral-600 bg-neutral-800 px-4 py-4"
      >
        <ShoppingCartIcon fontSize="small" />
        <span className="ml-2 text-sm font-medium text-white">0</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
