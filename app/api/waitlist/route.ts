import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { z } from "zod";

export const dynamic = "force-dynamic";

const emailSchema = z.string().email("Please enter a valid email address");
const waitlistPath = path.join(process.cwd(), "data/waitlist.json");

export async function GET() {
  try {
    const data = await fs.readFile(waitlistPath, "utf8");
    const waitlist = JSON.parse(data);
    return NextResponse.json(waitlist);
  } catch (error) {
    return NextResponse.json({ emails: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. Log the incoming request
    const body = await req.json();
    console.log("Received request body:", body);

    // 2. Validate email
    const validEmail = emailSchema.parse(body.email);
    console.log("Validated email:", validEmail);

    // 3. Read current waitlist
    const data = await fs.readFile(waitlistPath, "utf8");
    console.log("Current waitlist data:", data);

    // 4. Parse waitlist
    const waitlist = JSON.parse(data);
    console.log("Parsed waitlist:", waitlist);

    // 5. Check for duplicate
    if (waitlist.emails.includes(validEmail)) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // 6. Add new email
    waitlist.emails.push(validEmail);

    // 7. Write back to file
    await fs.writeFile(waitlistPath, JSON.stringify(waitlist, null, 2));
    console.log("Successfully wrote to file");

    return NextResponse.json(waitlist);
  } catch (error) {
    // Detailed error logging
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to add email: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Failed to add email" }, { status: 500 });
  }
}
