import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { s3Client } from "@/lib/s3";

async function uploadFileToS3(file: any, fileName: any) {
  const fileBuffer = file;

  const randomSuffix = Math.random().toString(36).substring(7);

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: `products/${fileName}-${randomSuffix}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `/products/${fileName}-${randomSuffix}`;
}

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    const fileNames: string[] = [];
    if (!files) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (files) {
      for (const file of Array.from(files)) {
        if (file instanceof File) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const fileName = await uploadFileToS3(buffer, file.name);
          fileNames.push(fileName);
        }
      }
    }

    const requestData = formData.get("requestData") as string;
    const productInfo = JSON.parse(requestData);

    const {
      title,
      description,
      price,
      featured,
      category,
      sizes,
      categoryId,
      discount,
    } = productInfo;

    if (
      !title ||
      title.length < 4 ||
      !description ||
      description.length < 4 ||
      !price ||
      !fileNames ||
      !category
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    let priceDiscount: number = 0;
    if (discount > 0) {
      const mathDiscount = (discount / 100) * +price;
      priceDiscount = +price - mathDiscount;
    }

    const product = await db?.product.create({
      data: {
        title,
        description,
        price,
        featured,
        imageURLs: fileNames,
        category,
        categoryId,
        discount,
        finalPrice: priceDiscount,
        productSizes: {
          create: sizes.map((size: any) => ({
            size: { connect: { id: size.id } },
            name: size.name,
          })),
        },
      },
    });
    return NextResponse.json({ msg: "Successful create product", product });
  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" });
  }
}

export async function GET(req: Request) {
  try {
    const tasks = await db.product.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Error getting products", status: 500 });
  }
}
