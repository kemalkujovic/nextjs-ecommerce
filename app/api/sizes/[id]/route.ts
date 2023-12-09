import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        categorySizes: {
          include: {
            size: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" });
    }

    const sizesForCategory = category.categorySizes.map((cs) => cs.size);

    return NextResponse.json(sizesForCategory);
  } catch (error) {
    console.error("Error fetching sizes for category:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
