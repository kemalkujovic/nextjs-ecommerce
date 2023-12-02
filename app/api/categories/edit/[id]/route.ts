import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    if (false) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Error getting category", status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    if (false) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const { category, billboard } = await req.json();

    const formData = { category, billboard };
    console.log(formData);
    const categoryProduct = await db.category.update({
      where: {
        id: id,
      },
      data: formData,
    });

    return NextResponse.json({
      msg: "Successful edit category",
      categoryProduct,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error updating category", status: 500 });
  }
}
