import { getAdminEmail, getSiteUrl, sendResendEmail } from "@/lib/email/resend";

export type LeadDetails = {
  name: string;
  email: string;
  phone?: string;
  source?: string;
  pageUrl?: string;
};

function leadTable(details: LeadDetails) {
  return `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
      <tr>
        <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid rgba(255,255,255,0.06);">Name</td>
        <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.06);">${details.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid rgba(255,255,255,0.06);">Email</td>
        <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.06);">${details.email}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid rgba(255,255,255,0.06);">Phone</td>
        <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.06);">${details.phone || "Not provided"}</td>
      </tr>
      ${details.source ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid rgba(255,255,255,0.06);">Source</td><td style="padding: 10px 0; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.06);">${details.source}</td></tr>` : ""}
      ${details.pageUrl ? `<tr><td style="padding: 10px 0; color: #64748b;">Page</td><td style="padding: 10px 0; text-align: right; font-size: 12px; color: #94a3b8; word-break: break-all;">${details.pageUrl}</td></tr>` : ""}
    </table>
  `;
}

export function buildNewLeadAdminEmailHtml(details: LeadDetails) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #d4af37; border-radius: 12px; background: #050505; color: white;">
      <h2 style="color: #d4af37; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">New Lead</h2>
      <p style="color: #64748b; font-size: 14px; margin: 0 0 4px;">Someone submitted their details from the website popup.</p>
      ${leadTable(details)}
      <p style="color: #475569; font-size: 12px; margin: 16px 0 0;">Submitted at ${new Date().toUTCString()}</p>
    </div>
  `;
}

export function buildLeadThankYouEmailHtml(name: string) {
  const siteUrl = getSiteUrl();
  const firstName = name.split(" ")[0] || "Trader";
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; background: #080808; color: #ffffff; padding: 40px 24px; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.25); max-width: 600px; margin: auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px; letter-spacing: 0.15em; text-transform: uppercase;">The Elite Trader</h1>
      </div>
      <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 16px;">Thanks, ${firstName}!</h2>
      <p style="color: #94a3b8; line-height: 1.7; font-size: 15px; margin: 0 0 20px;">
        We received your details. Our team will reach out shortly with plan options, enrolment steps, and answers to your questions.
      </p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${siteUrl}/#pricing" style="background: linear-gradient(to bottom, #e8c96a, #d4af37, #a88620); color: #000000; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px;">
          View Plans
        </a>
      </div>
      <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">Questions? Reply to this email or message us on Telegram @Elitefuture</p>
    </div>
  `;
}

export async function sendNewLeadAdminEmail(details: LeadDetails) {
  return sendResendEmail({
    to: getAdminEmail(),
    replyTo: details.email,
    subject: `[NEW LEAD] ${details.name} — ${details.email}`,
    html: buildNewLeadAdminEmailHtml(details),
  });
}

export async function sendLeadThankYouEmail(email: string, name: string) {
  return sendResendEmail({
    to: email,
    subject: "We received your details | The Elite Trader",
    html: buildLeadThankYouEmailHtml(name),
  });
}
