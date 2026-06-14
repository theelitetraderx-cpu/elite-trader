import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendLeadThankYouEmail, sendNewLeadAdminEmail } from "@/lib/email/leadEmail";
import { getResendClient } from "@/lib/email/resend";

function getSupabaseForLeads() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url) return null;

  if (serviceKey && serviceKey !== "YOUR_SERVICE_ROLE_KEY_HERE") {
    return createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  if (anonKey) {
    return createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const source = String(body.source ?? "popup").trim();
    const pageUrl = String(body.pageUrl ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!phone || phone.length < 8) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    const supabase = getSupabaseForLeads();
    if (!supabase) {
      return NextResponse.json({ error: "Database is not configured." }, { status: 500 });
    }

    const { error: dbError } = await supabase.from("leads").insert([
      {
        name,
        email,
        phone,
        source,
        page_url: pageUrl || null,
      },
    ]);

    if (dbError) {
      console.error("Lead insert error:", dbError);
      return NextResponse.json(
        { error: dbError.message || "Could not save your details. Please try again." },
        { status: 500 }
      );
    }

    if (!getResendClient()) {
      return NextResponse.json({
        success: true,
        warning: "Details saved, but email notifications are not configured.",
      });
    }

    const adminResult = await sendNewLeadAdminEmail({
      name,
      email,
      phone,
      source,
      pageUrl: pageUrl || undefined,
    });

    if (!adminResult.ok) {
      console.error("Lead admin email failed:", adminResult.error);
      return NextResponse.json({
        success: true,
        warning: "Details saved, but we could not notify the team by email.",
      });
    }

    const thankYouResult = await sendLeadThankYouEmail(email, name);

    return NextResponse.json({
      success: true,
      adminEmailId: adminResult.data?.id,
      thankYouEmailId: thankYouResult.ok ? thankYouResult.data?.id : null,
      sandboxCopy: thankYouResult.ok ? thankYouResult.sandboxCopy : adminResult.sandboxCopy,
      deliveredTo: thankYouResult.ok ? thankYouResult.deliveredTo : adminResult.deliveredTo,
      intendedTo: thankYouResult.ok ? thankYouResult.intendedTo : adminResult.intendedTo,
      warning: thankYouResult.ok ? undefined : "Saved. Team notified, but confirmation email failed.",
    });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Something went wrong." },
      { status: 500 }
    );
  }
}
