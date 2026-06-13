import { NextResponse } from "next/server";
import {
  sendAdminPaymentNotification,
  sendPaymentReceivedEmail,
} from "@/lib/email/paymentEmail";
import { getResendClient } from "@/lib/email/resend";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const amount = String(formData.get("amount") ?? "");
    const plan = String(formData.get("plan") ?? "");
    const network = String(formData.get("network") ?? "");
    const attachment = formData.get("attachment");
    const aadhaar = formData.get("aadhaar");
    const pan = formData.get("pan");

    if (!email || !amount || !attachment || typeof attachment.arrayBuffer !== "function") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!getResendClient()) {
      return NextResponse.json({ error: "Resend API key is not configured." }, { status: 500 });
    }

    const buffer = Buffer.from(await attachment.arrayBuffer());

    const adminResult = await sendAdminPaymentNotification({
      customerEmail: email,
      phone: phone || undefined,
      amount,
      plan,
      network,
      aadhaar: aadhaar ? String(aadhaar) : null,
      pan: pan ? String(pan) : null,
      attachment: { name: attachment.name, buffer },
    });

    if (!adminResult.ok) {
      console.error("Resend admin error:", adminResult.error);
      return NextResponse.json({ error: adminResult.error }, { status: 500 });
    }

    const customerResult = await sendPaymentReceivedEmail(email, {
      planName: plan,
      amount,
      network,
      phone: phone || undefined,
    });

    if (!customerResult.ok) {
      console.error("Customer payment email failed:", customerResult.error);
      return NextResponse.json({
        success: true,
        id: adminResult.data?.id,
        warning: "Payment submitted. Admin notified, but customer confirmation email failed.",
        customerError: customerResult.error,
      });
    }

    return NextResponse.json({
      success: true,
      id: adminResult.data?.id,
      customerEmailId: customerResult.data?.id,
      sandboxCopy: customerResult.sandboxCopy,
      deliveredTo: customerResult.deliveredTo,
      intendedTo: customerResult.intendedTo,
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Notification failed" },
      { status: 500 }
    );
  }
}
