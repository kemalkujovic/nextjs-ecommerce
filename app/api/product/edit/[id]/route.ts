import { db } from "@/lib/db";
import { S3Client } from "@aws-sdk/client-s3";
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
    const img = formData.get("image");
    const featured = formData.get("isFeatured");
    const isFeaturedBoolean = featured === "on";
    console.log(featured);
    let fileName: string | undefined;

    if (img && img instanceof File && img.name) {
      const imageName = img.name;
      const buffer = Buffer.from(await img.arrayBuffer());
      fileName = await uploadFileToS3(buffer, imageName);
    }

    const convPirce = +price;

    const updateData: {
      title: string;
      price: number;
      description: string;
      featured: boolean;
      category: string;
      imageURL?: string;
    } = {
      featured: isFeaturedBoolean,
      title,
      price: convPirce,
      description,
      category,
    };

    if (fileName) {
      updateData.imageURL = fileName;
    }

    const product = await db.product.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return NextResponse.json({ msg: "Successful edit product" });
  } catch (error) {
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
