import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === data.id && item.size === data.size
        );

        if (existingItem) {
          return toast.error("Item already in cart.");
        }
        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      removeItem: (data: any) => {
        const currentItems = get().items;
        const remainingItems = currentItems.filter(
          (item) => !(item.id === data.id && item.size === data.size)
        );
        set({ items: remainingItems });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
