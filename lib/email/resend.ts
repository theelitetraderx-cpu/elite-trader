import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export function getEmailFromAddress() {
  return process.env.RESEND_FROM_EMAIL ?? "Elite Trader <onboarding@resend.dev>";
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://theelitetrader.in";
}

/** Resend sandbox account owner — only this inbox can receive mail without a verified domain. */
export function getResendOwnerEmail() {
  return (
    process.env.RESEND_OWNER_EMAIL ??
    process.env.ADMIN_EMAIL ??
    "theelitetraderx@gmail.com"
  );
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL ?? getResendOwnerEmail();
}

export function isResendSandbox() {
  if (process.env.RESEND_SANDBOX === "false") return false;
  return getEmailFromAddress().includes("resend.dev");
}

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
};

export type SendEmailResult =
  | { ok: true; data: { id: string } | null; deliveredTo: string; intendedTo: string; sandboxCopy: boolean }
  | { ok: false; error: string };

export async function sendResendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "Resend API key is not configured." };
  }

  const intendedTo = options.to.trim();
  const ownerEmail = getResendOwnerEmail().trim().toLowerCase();
  const sandbox = isResendSandbox();
  const mustUseOwner = sandbox && intendedTo.toLowerCase() !== ownerEmail;

  const deliverTo = mustUseOwner ? getResendOwnerEmail() : intendedTo;
  const subject = mustUseOwner
    ? `[Customer copy] ${options.subject}`
    : options.subject;

  const sandboxBanner = mustUseOwner
    ? `<div style="background:#422006;border:1px solid #fbbf24;border-radius:8px;padding:14px;margin-bottom:20px;color:#fde68a;font-size:13px;line-height:1.6;">
        <strong>Sandbox mode:</strong> This confirmation was meant for
        <strong>${intendedTo}</strong>. Forward this email to the customer, or verify your domain at
        <a href="https://resend.com/domains" style="color:#fbbf24;">resend.com/domains</a>
        to send directly to any Gmail address.
      </div>`
    : "";

  const { data, error } = await resend.emails.send({
    from: getEmailFromAddress(),
    to: [deliverTo],
    replyTo: options.replyTo,
    subject,
    html: `${sandboxBanner}${options.html}`,
    attachments: options.attachments,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return {
    ok: true,
    data: data ?? null,
    deliveredTo: deliverTo,
    intendedTo,
    sandboxCopy: mustUseOwner,
  };
}
