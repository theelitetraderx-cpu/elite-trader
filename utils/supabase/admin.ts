import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL is required. Please set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in .env.local');
}

if (!supabaseServiceKey || supabaseServiceKey === 'YOUR_SERVICE_ROLE_KEY_HERE') {
  console.error('❌ CRITICAL ERROR: SUPABASE_SERVICE_ROLE_KEY is missing or invalid.');
  // We throw here to stop the API execution and return an error instead of a crash
  throw new Error('supabaseKey is required (Service Role Key is missing)');
}

// Admin client bypasses RLS - Only use server-side
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

