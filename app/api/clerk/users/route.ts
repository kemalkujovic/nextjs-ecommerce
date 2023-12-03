import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { email, password, isAdmin, userName } = await req.json();

    const admin = isAdmin === "Admin" ? true : false;
    const user = await clerkClient.users.createUser({
      username: userName,
      emailAddress: [email],
      password: password,
      unsafeMetadata: {
        isAdmin: admin,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user: any = await clerkClient.users.getUserList();

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
