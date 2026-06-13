import { markLoggedIn } from "@/lib/auth/session";

export async function sendWelcomeEmail(email: string, firstName: string) {
  await fetch("/api/auth/welcome", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, firstName }),
  }).catch((err) => console.error("Welcome email failed:", err));
}

export async function completeClientSignIn(session: {
  user?: {
    email?: string | null;
    user_metadata?: { first_name?: string };
  } | null;
}) {
  const user = session?.user;
  if (!user) return false;

  if (user.email) {
    await sendWelcomeEmail(
      user.email,
      user.user_metadata?.first_name || "Trader"
    );
  }

  markLoggedIn();
  return true;
}
