import { createBrowserClient } from "@supabase/ssr";

// Use an empty string fallback to prevent @supabase/ssr from panicking during Next.js build-time prerendering
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? "";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
