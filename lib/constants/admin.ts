export const SITE_ADMIN_EMAIL = "theelitetraderx@gmail.com";

/** Common typo in Vercel env — auto-corrected in email routing */
export const ADMIN_EMAIL_TYPOS: Record<string, string> = {
  "theelitetradex@gmail.com": SITE_ADMIN_EMAIL,
};

export function normalizeAdminEmail(email: string) {
  const trimmed = email.trim();
  return ADMIN_EMAIL_TYPOS[trimmed.toLowerCase()] ?? trimmed;
}

export function isSiteAdmin(email?: string | null) {
  if (!email) return false;
  return normalizeAdminEmail(email).toLowerCase() === SITE_ADMIN_EMAIL;
}
