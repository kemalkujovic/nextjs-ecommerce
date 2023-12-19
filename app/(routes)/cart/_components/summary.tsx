"use client";

import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

const Summary = () => {
  const items = useCart((state) => state.items);

  const totalPrice = items.reduce((a: any, b: any) => {
    const sum = a.totalPrice! + b.totalPrice!;
    return sum;
  });

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <p className="text-lg text-gray-900 font-semibold">
            ${Number(totalPrice).toFixed(2)}
          </p>
        </div>
      </div>
      <Button disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
