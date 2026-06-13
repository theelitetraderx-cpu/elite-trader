import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/welcomeEmail";

/** @deprecated Use /api/auth/welcome — kept for backwards compatibility */
export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await sendWelcomeEmail(email, firstName);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
