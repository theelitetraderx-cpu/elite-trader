import { NextResponse } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseConfig } from "@/lib/supabase/env";

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      ok: false,
      error: "Missing NEXT_PUBLIC_SUPABASE_URL or API key in .env.local",
    });
  }

  const url = getSupabaseUrl().replace(/\/$/, "");

  try {
    const response = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: getSupabaseAnonKey() },
      cache: "no-store",
    });

    return NextResponse.json({
      ok: response.ok,
      status: response.status,
      url,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({
      ok: false,
      url,
      error: message,
      hint:
        "This URL may be wrong or the Supabase project was deleted. Copy the correct Project URL from Supabase → Project Settings → API.",
    });
  }
}
