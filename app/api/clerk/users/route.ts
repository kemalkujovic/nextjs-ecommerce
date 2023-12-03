import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

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

export async function GET(req: Request) {
  try {
    const user: any = await clerkClient.users.getUserList();

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
