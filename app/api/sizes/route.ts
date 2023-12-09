import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { categoryId, sizes } = await req.json();

  try {
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" });
    }

    const createdSizes = await Promise.all(
      sizes.map(async (size: any) => {
        return db.size.create({
          data: { name: size },
        });
      })
    );

    const categorySizeCreateManyInput = createdSizes.map((size) => ({
      categoryId,
      sizeId: size.id,
    }));

    const createdCategorySizes = await Promise.all(
      categorySizeCreateManyInput.map(async (input) => {
        return db.categorySize.create({
          data: input,
        });
      })
    );

    return NextResponse.json({
      createdCategorySizes,
      message: "Sizes added successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
