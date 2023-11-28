import { db } from "@/lib/db";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    if (false) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    const imageKey = product?.imageURL;

    const task = await db.product.delete({
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
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
