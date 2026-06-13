import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sendPaymentVerifiedEmail } from "@/lib/email/paymentEmail";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { paymentId, email, planName, amount, txHash, network } = await request.json();

    if (!paymentId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error: updateError } = await supabase
      .from("payments")
      .update({ status: "Verified" })
      .eq("id", paymentId);

    if (updateError) throw updateError;

    const emailResult = await sendPaymentVerifiedEmail(email, {
      planName: planName || "Elite Trader Plan",
      amount: String(amount ?? ""),
      network: network || undefined,
      txHash: txHash || undefined,
    });

    if (!emailResult.ok) {
      console.error("Resend Error:", emailResult.error);
      return NextResponse.json({
        message: "Status updated, but email dispatch failed",
        error: emailResult.error,
      });
    }

    return NextResponse.json(
      { message: "Success", emailId: emailResult.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 500 }
    );
  }
}
