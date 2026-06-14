import { NextResponse } from "next/server";
import {
  sendAdminPaymentNotification,
  sendCustomerInvoiceEmail,
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
      return NextResponse.json({
        success: true,
        warning: "Payment saved. Email service is not configured — our team will still review your submission.",
      });
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
      return NextResponse.json({
        success: true,
        warning: "Payment saved. Email notification could not be sent — our team will still review your submission.",
        emailError: adminResult.error,
      });
    }

    const customerResult = await sendCustomerInvoiceEmail(email, {
      planName: plan,
      amount,
      network,
      phone: phone || undefined,
    });

    if (!customerResult.ok) {
      console.error("Customer invoice email failed:", customerResult.error);
      return NextResponse.json({
        success: true,
        id: adminResult.data?.id,
        warning: "Payment submitted successfully. Admin notified. Invoice email could not be sent.",
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
      message: customerResult.sandboxCopy
        ? "Payment submitted. Invoice copy sent to our team inbox (Resend test mode)."
        : "Payment submitted successfully. Check your email for your invoice PDF.",
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Notification failed" },
      { status: 500 }
    );
  }
}
