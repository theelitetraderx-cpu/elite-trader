import { getSiteUrl, sendResendEmail } from "@/lib/email/resend";

export function buildWelcomeEmailHtml(firstName: string) {
  const name = firstName || "Trader";
  const siteUrl = getSiteUrl();

  return `
    <div style="font-family: 'Inter', Arial, sans-serif; background: #080808; color: #ffffff; padding: 40px 24px; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.25); max-width: 600px; margin: auto;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #d4af37; margin: 0; font-size: 28px; letter-spacing: 0.2em; text-transform: uppercase;">The Elite Trader</h1>
        <div style="height: 1px; width: 120px; background: linear-gradient(to right, transparent, #d4af37, transparent); margin: 16px auto;"></div>
        <p style="color: #94a3b8; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; margin: 0;">Discipline • Strategy • Freedom</p>
      </div>

      <h2 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 16px;">Welcome back, ${name}!</h2>
      <p style="color: #94a3b8; line-height: 1.7; font-size: 15px; margin: 0 0 16px;">
        You have successfully signed in to <strong style="color: #e8c96a;">The Elite Trader</strong>.
        Your dashboard, courses, and elite community are ready for you.
      </p>

      <div style="background: rgba(255, 255, 255, 0.03); padding: 24px; border-radius: 12px; margin: 28px 0; border: 1px solid rgba(255, 255, 255, 0.06);">
        <h3 style="color: #d4af37; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 16px;">What you can do next</h3>
        <p style="color: #cbd5e1; font-size: 14px; line-height: 1.8; margin: 0;">
          ✦ Access your trader dashboard<br/>
          ✦ Explore Foundation, PRO &amp; ELITE courses<br/>
          ✦ Join the community on Telegram<br/>
          ✦ View live signals and announcements
        </p>
      </div>

      <div style="text-align: center; margin: 32px 0 8px;">
        <a href="${siteUrl}/dashboard" style="background: linear-gradient(to bottom, #e8c96a, #d4af37, #a88620); color: #000000; padding: 14px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; text-transform: uppercase; letter-spacing: 0.08em; font-size: 13px;">
          Go to Dashboard
        </a>
      </div>

      <p style="color: #64748b; font-size: 13px; line-height: 1.6; text-align: center; margin: 24px 0 0;">
        Trade smart. Stay disciplined. Welcome to the elite.
      </p>

      <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
        <p style="font-size: 12px; color: #475569; margin: 0;">© ${new Date().getFullYear()} The Elite Trader. Precision Trading. Consistent Profits.</p>
      </div>
    </div>
  `;
}

export async function sendWelcomeEmail(email: string, firstName?: string) {
  return sendResendEmail({
    to: email,
    subject: "Welcome back to The Elite Trader",
    html: buildWelcomeEmailHtml(firstName ?? "Trader"),
  });
}
