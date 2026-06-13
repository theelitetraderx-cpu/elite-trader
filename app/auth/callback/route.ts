import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/welcomeEmail";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        const firstName =
          (user.user_metadata?.first_name as string | undefined) ||
          user.user_metadata?.full_name?.split(" ")?.[0] ||
          "Trader";

        void sendWelcomeEmail(user.email, firstName).catch((err) => {
          console.error("Welcome email failed after OAuth:", err);
        });
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
