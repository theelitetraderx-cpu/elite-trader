import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sendPaymentVerifiedEmail } from "@/lib/email/paymentEmail";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { email, planName, amount, network, txHash } = await request.json();

    if (!email || !planName || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: newPayment, error: insertError } = await supabase
      .from("payments")
      .insert([
        {
          email,
          plan_name: planName,
          amount: parseFloat(amount),
          network: network || "USDT",
          tx_hash: txHash || `MANUAL_${Date.now()}`,
          status: "Verified",
        },
      ])
      .select();

    if (insertError) throw insertError;

    const emailResult = await sendPaymentVerifiedEmail(email, {
      planName,
      amount: String(amount),
      network: network || "USDT",
      txHash: txHash || undefined,
    });

    if (!emailResult.ok) {
      console.error("Resend Error:", emailResult.error);
      return NextResponse.json({
        message: "Record created, but email dispatch failed",
        error: emailResult.error,
      });
    }

    return NextResponse.json({ message: "Success", payment: newPayment }, { status: 200 });
  } catch (error) {
    console.error("Manual Add Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 }
    );
  }
}
