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
