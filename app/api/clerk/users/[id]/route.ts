import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
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

    const user = await clerkClient.users.deleteUser(id);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { isAdmin } = await req.json();

  const admin = isAdmin === "Admin" ? true : false;

  try {
    const user: any = await clerkClient.users.getUser(id);

    if (user) {
      await clerkClient.users.updateUser(id, {
        unsafeMetadata: {
          isAdmin: admin,
        },
      });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

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

    const user: any = await clerkClient.users.getUser(id);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
