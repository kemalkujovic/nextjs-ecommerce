import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
    const productSizes = await db.productSize.findMany({
      where: {
        productId: id,
      },
    });

    console.log(productSizes);

    await Promise.all(
      productSizes.map(async (productSize) => {
        await db.productSize.delete({
          where: {
            id: productSize.id,
          },
        });
      })
    );

    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    const imageKey = product?.imageURLs;

    const task = await db.product.delete({
      where: {
        id,
      },
    });

    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

    if (imageKey) {
      for (const image of Array.from(imageKey)) {
        const s3Key = image.slice(1);

        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
        });
        await s3Client.send(deleteCommand);
      }
    }

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = auth();

  try {
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
