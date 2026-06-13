import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/welcomeEmail";

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await sendWelcomeEmail(email, firstName);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Welcome email sent", id: result.data?.id });
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to send welcome email.";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
