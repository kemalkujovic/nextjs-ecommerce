import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type GraphData = {
  name: string;
  total: number;
};

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const orders = await db.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of orders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = 0;

      for (const item of order.orderItems) {
        revenueForOrder += +item.product.price;
      }

      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData: GraphData[] = [
      {
        name: "Jan",
        total: 0,
      },
      {
        name: "Feb",
        total: 0,
      },
      {
        name: "Mar",
        total: 0,
      },
      {
        name: "Apr",
        total: 0,
      },
      {
        name: "May",
        total: 0,
      },
      {
        name: "Jun",
        total: 0,
      },
      {
        name: "Jul",
        total: 0,
      },
      {
        name: "Aug",
        total: 0,
      },
      {
        name: "Sep",
        total: 0,
      },
      {
        name: "Oct",
        total: 0,
      },
      {
        name: "Nov",
        total: 0,
      },
      {
        name: "Dec",
        total: 0,
      },
    ];

    for(const month in monthlyRevenue){
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }

    return NextResponse.json(graphData);
  } catch (error) {
    return NextResponse.json({ error: "Error getting graph data.", status: 500 });
  }
}
