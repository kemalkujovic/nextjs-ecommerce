import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { uploadFileToS3 } from "../../route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = auth();
  console.log(id);
  try {
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const billboard = await db.billboard.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return NextResponse.json({ error: "Error getting billboard", status: 500 });
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

    const file: File | null = formData.get("file") as File;
    const requestData = formData.get("billboard") as string;
    const productInfo = JSON.parse(requestData);
    const title = productInfo;

    let fileName: string | undefined;

    if (file && file instanceof File && file.name) {
      const imageName = file.name;
      const buffer = Buffer.from(await file.arrayBuffer());
      fileName = await uploadFileToS3(buffer, imageName);
    }

    if (!title || title.length < 4) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const updateData: {
      billboard: string;
      imageURL?: string;
    } = {
      billboard: title,
    };

    if (fileName) {
      updateData.imageURL = fileName;
    }
    const product = await db.billboard.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return NextResponse.json({ product, msg: "Successful edit billboard" });
  } catch (error) {
    return NextResponse.json({
      error: "Error ediiting billboard",
      status: 500,
    });
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
    const billboard = await db.billboard.findUnique({
      where: {
        id,
      },
    });

    const imageKey = billboard?.imageURL;

    const task = await db.billboard.delete({
      where: {
        id,
      },
    });

    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

    const s3Key = imageKey;

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });
    await s3Client.send(deleteCommand);

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({
      error: "Error deleting billboard",
      status: 500,
    });
  }
}
