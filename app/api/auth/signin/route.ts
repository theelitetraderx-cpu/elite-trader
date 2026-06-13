import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseUrl, hasSupabaseConfig } from "@/lib/supabase/env";

export async function POST(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      { error: "Supabase is not configured in environment variables." },
      { status: 500 }
    );
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password: String(password),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Sign in failed.";
    const isNetwork =
      message.includes("fetch failed") ||
      message.includes("ENOTFOUND") ||
      message.includes("getaddrinfo");

    return NextResponse.json(
      {
        error: isNetwork
          ? `Cannot connect to Supabase (${getSupabaseUrl()}). Check NEXT_PUBLIC_SUPABASE_URL in .env.local.`
          : message,
      },
      { status: isNetwork ? 503 : 500 }
    );
  }
}
