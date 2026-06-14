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
  return (
    process.env.RESEND_FROM_EMAIL ??
    "Elite Trader <noreply@theelitetrader.in>"
  );
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

/**
 * When true, non-owner recipients are routed to the owner inbox with a [Customer copy] prefix.
 * Auto-disabled when sending from a verified custom domain (theelitetrader.in).
 */
export function isResendSandbox() {
  if (process.env.RESEND_SANDBOX === "false") return false;
  if (process.env.RESEND_SANDBOX === "true") return true;
  const from = getEmailFromAddress().toLowerCase();
  if (from.includes("theelitetrader.in")) return false;
  if (from.includes("resend.dev")) return true;
  return true;
}

export function getAdminEmail() {
  if (isResendSandbox()) {
    return getResendOwnerEmail();
  }
  return process.env.ADMIN_EMAIL ?? getResendOwnerEmail();
}

export function isResendSandboxRestrictionError(message: string) {
  const lower = message.toLowerCase();
  return (
    lower.includes("testing emails") ||
    lower.includes("verify a domain") ||
    lower.includes("resend.com/domains")
  );
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

function buildSandboxBanner(intendedTo: string) {
  return `<div style="background:#422006;border:1px solid #fbbf24;border-radius:8px;padding:14px;margin-bottom:20px;color:#fde68a;font-size:13px;line-height:1.6;">
        <strong>Sandbox mode:</strong> This email was meant for
        <strong>${intendedTo}</strong>. Forward it to the customer, or verify your domain at
        <a href="https://resend.com/domains" style="color:#fbbf24;">resend.com/domains</a>
        and set <code>RESEND_SANDBOX=false</code> in Vercel.
      </div>`;
}

async function deliverEmail(
  resend: Resend,
  options: {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
    attachments?: { filename: string; content: Buffer }[];
  }
) {
  return resend.emails.send({
    from: getEmailFromAddress(),
    to: [options.to],
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  });
}

export async function sendResendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "Resend API key is not configured." };
  }

  const intendedTo = options.to.trim();
  const ownerEmail = getResendOwnerEmail().trim();
  const sandbox = isResendSandbox();
  const mustUseOwner =
    sandbox && intendedTo.toLowerCase() !== ownerEmail.toLowerCase();

  const deliverTo = mustUseOwner ? ownerEmail : intendedTo;
  const subject = mustUseOwner ? `[Customer copy] ${options.subject}` : options.subject;
  const html = mustUseOwner
    ? `${buildSandboxBanner(intendedTo)}${options.html}`
    : options.html;

  let { data, error } = await deliverEmail(resend, {
    to: deliverTo,
    subject,
    html,
    replyTo: options.replyTo,
    attachments: options.attachments,
  });

  // Resend sandbox restriction — always retry to owner inbox
  if (error && isResendSandboxRestrictionError(error.message)) {
    const alreadyOwner = deliverTo.toLowerCase() === ownerEmail.toLowerCase();
    if (!alreadyOwner) {
      const retrySubject = `[Customer copy] ${options.subject}`;
      const retryHtml = `${buildSandboxBanner(intendedTo)}${options.html}`;
      const retry = await deliverEmail(resend, {
        to: ownerEmail,
        subject: retrySubject,
        html: retryHtml,
        replyTo: options.replyTo,
        attachments: options.attachments,
      });
      data = retry.data;
      error = retry.error;

      if (!error) {
        return {
          ok: true,
          data: data ?? null,
          deliveredTo: ownerEmail,
          intendedTo,
          sandboxCopy: true,
        };
      }
    }
  }

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
