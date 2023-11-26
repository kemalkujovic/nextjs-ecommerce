import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: user auth
  if (false) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  // dummy products
  const { title, description, price, featured } = await req.json();

  // TODO: validation form.

  try {
    const product = await db?.product.create({
      data: {
        title,
        description,
        price,
        featured,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating product!", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // TODO: User auth
    if (false) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await db.product.findMany();
    console.log(tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Error getting products", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (false) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { id, title, description, price, featured } = await req.json();

    const task = await db.product.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        price,
        featured,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
