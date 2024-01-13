import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { uploadFileToS3 } from "../../route";
import { auth } from "@clerk/nextjs";

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

    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        productSizes: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Error getting product", status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = auth();

  try {
    const formData = await req.formData();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const title = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const featured = formData.get("isFeatured");
    const discount = formData.get("discount") as number | null;
    const isFeaturedBoolean = featured === "on";
    const files = formData.getAll("image");
    const fileNames: string[] = [];

    if (!files) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const sizes = JSON.parse(formData.get("productSizes") as string) as {
      sizeId: string;
      name: string;
    }[];

    const convPirce = +price;

    const existingSizes = await db.productSize.findMany({
      where: {
        productId: id,
      },
      select: {
        id: true,
      },
    });

    const newSize = existingSizes.map((item) => item.id);
    const existingSizes2 = sizes.filter((item, index) => item.sizeId);

    const filteredExistingSizes2 = existingSizes2.filter(
      (item: any) => !newSize.includes(item.id)
    );

    let priceDiscount: number = 0;
    
    if (discount !== null && discount > 0) {
      const mathDiscount = (discount / 100) * +price;
      priceDiscount = +price - mathDiscount;
    }

    const updateData: {
      title: string;
      price: number;
      description: string;
      featured: boolean;
      category: string;
      finalPrice: number;
      discount?: number;
      imageURLs?: string[];

      productSizes?: {
        create: {
          size: { connect: { id: string } };
          name: string;
        }[];
      };
    } = {
      featured: isFeaturedBoolean,
      title,
      price: convPirce,
      description,
      category,
      finalPrice: priceDiscount,
      productSizes: {
        create: filteredExistingSizes2.map((size: any) => ({
          size: { connect: { id: size.sizeId } },
          name: size.name,
        })),
      },
    };

    if (discount !== null && discount > 0) {
      updateData.discount = +discount;
    }
    
    if (files) {
      for (const file of Array.from(files)) {
        if (file instanceof File && file.name) {
          console.log(file.name);
          const buffer = Buffer.from(await file.arrayBuffer());
          const fileName = await uploadFileToS3(buffer, file.name);
          updateData.imageURLs = fileNames;
          fileNames.push(fileName);
        }
      }
    }

    const product = await db.product.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return NextResponse.json({ product, msg: "Successful edit product" });
  } catch (error) {
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
