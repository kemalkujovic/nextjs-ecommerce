import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { CartItem } from "@/hooks/use-cart";

export async function POST(req: Request) {
  const { items } = await req.json();
  console.log(items);
  if (!items || items.length === 0) {
    return NextResponse.json("Product its are required", { status: 400 });
  }

  //   const products = await db.product.findMany({
  //     where: {
  //       id: {
  //         in: productIds,
  //       },
  //     },
  //   });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  items.forEach((product: CartItem) => {
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.title,
        },
        unit_amount: +product.price * 100,
      },
    });
  });

  const order = await db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: items.map((product: CartItem) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderdId: order.id,
    },
  });
  return NextResponse.json({ url: session.url });
}
