import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseConfig } from "@/lib/supabase/env";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;
let cachedKey = "";

export const createClient = () => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  if (!browserClient || cachedKey !== key || !hasSupabaseConfig()) {
    browserClient = createBrowserClient(url, key);
    cachedKey = key;
  }

  return browserClient;
};
