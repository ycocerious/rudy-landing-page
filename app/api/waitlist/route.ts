import { addToWaitlist, getWaitlist } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const emails = await getWaitlist();
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ emails: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await addToWaitlist(body.email);
    const emails = await getWaitlist();
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("POST error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to add email" }, { status: 500 });
  }
}
