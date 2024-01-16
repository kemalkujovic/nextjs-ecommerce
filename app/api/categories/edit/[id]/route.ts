import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = auth();

  try {
    if (!userId) {
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
  const { userId } = auth();

  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { category, billboard } = await req.json();

    const formData = { category, billboard };
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = auth();

  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const productSizes = await db.categorySize.findMany({
      where: {
        categoryId: id,
      },
    });

    await Promise.all(
      productSizes.map(async (productSize) => {
        await db.categorySize.delete({
          where: {
            id: productSize.id,
          },
        });
      })
    );

    const task = await db.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
