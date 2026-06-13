import { getAdminEmail, getSiteUrl, sendResendEmail } from "@/lib/email/resend";

export { getAdminEmail } from "@/lib/email/resend";

type PaymentDetails = {
  planName: string;
  amount: string;
  network?: string;
  phone?: string;
  txHash?: string;
};

function emailShell(title: string, body: string) {
  const siteUrl = getSiteUrl();
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; background: #080808; color: #ffffff; padding: 40px 24px; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.25); max-width: 600px; margin: auto;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 style="color: #d4af37; margin: 0; font-size: 26px; letter-spacing: 0.2em; text-transform: uppercase;">The Elite Trader</h1>
        <div style="height: 1px; width: 120px; background: linear-gradient(to right, transparent, #d4af37, transparent); margin: 14px auto;"></div>
      </div>
      <h2 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0 0 16px;">${title}</h2>
      ${body}
      <div style="text-align: center; margin: 28px 0 8px;">
        <a href="${siteUrl}/dashboard" style="background: linear-gradient(to bottom, #e8c96a, #d4af37, #a88620); color: #000000; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px;">
          Go to Dashboard
        </a>
      </div>
      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
        <p style="font-size: 12px; color: #475569; margin: 0;">© ${new Date().getFullYear()} The Elite Trader. Precision Trading. Consistent Profits.</p>
      </div>
    </div>
  `;
}

function detailsTable(details: PaymentDetails, status: string, statusColor: string) {
  const amount = details.amount.startsWith("$") ? details.amount : `$${details.amount}`;
  return `
    <div style="background: rgba(255, 255, 255, 0.03); padding: 22px; border-radius: 12px; margin: 22px 0; border: 1px solid rgba(255, 255, 255, 0.06);">
      <table style="width: 100%; font-size: 14px; color: #e2e8f0; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #64748b;">Plan</td><td style="padding: 8px 0; text-align: right; font-weight: bold;">${details.planName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Amount</td><td style="padding: 8px 0; text-align: right; font-weight: bold; color: #d4af37;">${amount}</td></tr>
        ${details.network ? `<tr><td style="padding: 8px 0; color: #64748b;">Network</td><td style="padding: 8px 0; text-align: right;">${details.network}</td></tr>` : ""}
        ${details.phone ? `<tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0; text-align: right;">${details.phone}</td></tr>` : ""}
        ${details.txHash ? `<tr><td style="padding: 8px 0; color: #64748b;">Tx Hash</td><td style="padding: 8px 0; text-align: right; font-size: 10px; color: #94a3b8; word-break: break-all;">${details.txHash}</td></tr>` : ""}
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Status</td>
          <td style="padding: 8px 0; text-align: right;">
            <span style="background: ${statusColor}20; color: ${statusColor}; padding: 3px 10px; border-radius: 10px; font-size: 10px; font-weight: bold; text-transform: uppercase;">${status}</span>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function buildPaymentReceivedEmailHtml(details: PaymentDetails) {
  const body = `
    <p style="color: #94a3b8; line-height: 1.7; font-size: 15px; margin: 0 0 12px;">
      Thank you for submitting your payment details to <strong style="color: #e8c96a;">The Elite Trader</strong>.
      We have received your proof and our team will verify it shortly.
    </p>
    ${detailsTable(details, "Pending verification", "#fbbf24")}
    <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 0;">
      Verification usually takes 1–6 hours. You will receive another email once your payment is confirmed.
    </p>
  `;
  return emailShell("Payment Details Received", body);
}

export function buildPaymentVerifiedEmailHtml(details: PaymentDetails) {
  const body = `
    <p style="color: #94a3b8; line-height: 1.7; font-size: 15px; margin: 0 0 12px;">
      Great news! Your payment for <strong style="color: #e8c96a;">${details.planName}</strong> has been verified.
      You now have full access to your program materials and the elite community.
    </p>
    ${detailsTable(details, "Verified", "#4ade80")}
    <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 0;">
      Welcome to the elite. Log in to your dashboard to get started.
    </p>
  `;
  return emailShell("Payment Verified Successfully", body);
}

export async function sendPaymentReceivedEmail(email: string, details: PaymentDetails) {
  return sendResendEmail({
    to: email,
    subject: `Payment received — ${details.planName} | The Elite Trader`,
    html: buildPaymentReceivedEmailHtml(details),
  });
}

export async function sendPaymentVerifiedEmail(email: string, details: PaymentDetails) {
  return sendResendEmail({
    to: email,
    subject: `Payment confirmed — Welcome to ${details.planName}!`,
    html: buildPaymentVerifiedEmailHtml(details),
  });
}

export async function sendAdminPaymentNotification(options: {
  customerEmail: string;
  phone?: string;
  amount: string;
  plan: string;
  network: string;
  aadhaar?: string | null;
  pan?: string | null;
  attachment: { name: string; buffer: Buffer };
}) {
  const { customerEmail, phone, amount, plan, network, aadhaar, pan, attachment } = options;

  return sendResendEmail({
    to: getAdminEmail(),
    replyTo: customerEmail,
    subject: `[PAYMENT] Notification from ${customerEmail}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 12px; background: #050505; color: white;">
        <h2 style="color: #d4af37; text-transform: uppercase; letter-spacing: 2px;">New Payment Received</h2>
        <p style="color: #64748b; font-size: 14px;">A customer has submitted a payment notification for verification.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 10px 0; color: #64748b;">Customer Email</td><td style="padding: 10px 0; font-weight: bold;">${customerEmail}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Phone</td><td style="padding: 10px 0; font-weight: bold;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Amount</td><td style="padding: 10px 0; font-weight: bold; color: #d4af37;">${amount}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Plan</td><td style="padding: 10px 0; font-weight: bold;">${plan}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Network</td><td style="padding: 10px 0; font-weight: bold;">${network}</td></tr>
        </table>
        ${aadhaar ? `<p style="color: #94a3b8; font-size: 13px;">Aadhaar: ${aadhaar} · PAN: ${pan}</p>` : ""}
      </div>
    `,
    attachments: [{ filename: attachment.name, content: attachment.buffer }],
  });
}
