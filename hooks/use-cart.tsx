import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

export interface CartItem extends Product {
  quantity: number;
  totalPrice?: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (data: Product) => void;
  removeAll: (data: Product) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;

        const existingItem = currentItems.findIndex(
          (item) => item.id === data.id && item.size === data.size
        );

        if (existingItem !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItem].quantity += 1;

          updatedItems[existingItem].totalPrice =
            updatedItems[existingItem].quantity *
            (data.finalPrice && data.finalPrice > 0
              ? data.finalPrice
              : +data.price);

          set({ items: updatedItems });
          toast.success("Item added to cart.");
        } else {
          set({ items: [...currentItems, { ...data, quantity: 1 }] });
          toast.success("Item added to cart.");
        }
      },
      removeItem: (data: Product) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === data.id && item.size === data.size
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems];
          if (updatedItems[existingItemIndex].quantity > 1) {
            updatedItems[existingItemIndex].quantity -= 1;
            updatedItems[existingItemIndex].totalPrice =
              updatedItems[existingItemIndex].quantity *
              (data.finalPrice && data.finalPrice > 0
                ? data.finalPrice
                : +data.price);
          } else {
            updatedItems.splice(existingItemIndex, 1);
          }
          set({ items: updatedItems });
          toast.success("Item removed from cart.");
        }
      },
      removeAll: (data: Product) => {
        const currentItems = get().items;
        const remainingItems = currentItems.filter(
          (item) => !(item.id === data.id && item.size === data.size)
        );
        set({ items: remainingItems });
        toast.success("Item removed from cart.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
