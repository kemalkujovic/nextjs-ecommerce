import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(file: any, fileName: any) {
  const fileBuffer = file;

  const randomSuffix = Math.random().toString(36).substring(7);

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: `${fileName}-${randomSuffix}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `${fileName}-${randomSuffix}`;
}

export async function POST(req: Request) {
  // TODO: user auth
  if (false) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const formData = await req.formData();
    const file: File | null = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = await uploadFileToS3(buffer, file.name);
    console.log(fileName);

    const requestData = formData.get("requestData") as string;
    const productInfo = JSON.parse(requestData);

    const { title, description, price, featured, category } = productInfo;
    console.log(category);
    const product = await db?.product.create({
      data: {
        title,
        description,
        price,
        featured,
        imageURL: fileName,
        category,
      },
    });
    return NextResponse.json({ msg: "Successful create product", product });
  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" });
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
