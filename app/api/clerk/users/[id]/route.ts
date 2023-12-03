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

export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    const user: any = await clerkClient.users.getUserList(email);
    const id = user[0].id;

    if (user) {
      await clerkClient.users.updateUser(id, {
        unsafeMetadata: {
          isAdmin: true,
        },
      });
      return NextResponse.json({ msg: "ADMIN ADD", user: user });
    }
    return NextResponse.json({ success: true, user: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
