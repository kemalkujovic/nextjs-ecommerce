import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: user auth
  if (false) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const { name, billboard } = await req.json();
    console.log(name, billboard);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const category = await db?.category.create({
      data: {
        category: name,
        billboard,
      },
    });
    return NextResponse.json({ msg: "Successful create category", category });
  } catch (error) {
    return NextResponse.json({ error: "Error creating category" });
  }
}

export async function GET(req: Request) {
  try {
    // TODO: User auth
    if (false) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const category = await db.category.findMany();
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Error getting category.", status: 500 });
  }
}
