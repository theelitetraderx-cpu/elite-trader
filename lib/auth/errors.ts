import { getErrorMessage } from "@/lib/getErrorMessage";

const NETWORK_ERROR_HINT =
  "Cannot reach Supabase. Open your Supabase dashboard → Project Settings → API, copy the Project URL and anon/publishable key into .env.local, then restart the dev server.";

export function getAuthErrorMessage(error: unknown, fallback: string) {
  const message = getErrorMessage(error, fallback);

  if (
    message === "Failed to fetch" ||
    message.includes("fetch failed") ||
    message.includes("ENOTFOUND") ||
    message.includes("getaddrinfo")
  ) {
    return NETWORK_ERROR_HINT;
  }

  if (message.includes("Email not confirmed")) {
    return "Please check your inbox and verify your email address before signing in.";
  }

  if (message.includes("Invalid login credentials")) {
    return "Invalid email or password. Please try again.";
  }

  if (message.toLowerCase().includes("already registered")) {
    return "This email is already registered. Try signing in instead.";
  }

  return message;
}
