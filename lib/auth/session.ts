export function markLoggedIn() {
  if (typeof window === "undefined") return;
  localStorage.setItem("isLoggedIn", "true");
  window.dispatchEvent(new Event("auth-change"));
}

export function clearLoggedIn() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("isLoggedIn");
  window.dispatchEvent(new Event("auth-change"));
}

export function getOAuthRedirectUrl(next = "/dashboard") {
  if (typeof window === "undefined") return `/auth/callback?next=${encodeURIComponent(next)}`;
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

export function getEmailConfirmRedirectUrl(next = "/dashboard") {
  return getOAuthRedirectUrl(next);
}

/** Returns digit count after the country code in "+91 9876543210" style values. */
export function phoneDigitCount(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const codeDigits = (phone.match(/^\+\d+/)?.[0] ?? "").replace(/\D/g, "").length;
  return Math.max(0, digits.length - codeDigits);
}

export function isPhoneComplete(phone: string, requiredLength = 10) {
  return phoneDigitCount(phone) === requiredLength;
}
